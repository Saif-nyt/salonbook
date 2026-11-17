"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Camera, Check, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiFetch, ApiError, uploadImage } from "@/lib/api";
import type { User } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Avatar } from "@/components/ui/avatar";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .regex(/^[+()\d\s-]*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  image: z.string().trim().url("Enter a valid image URL").optional().or(z.literal("")),
});

type Values = z.infer<typeof schema>;

export function CustomerProfile() {
  const { user, refreshUser } = useAuth();
  const fileInput = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    values: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      image: user?.image ?? "",
    },
  });

  const imageValue = form.watch("image");

  const mutation = useMutation({
    mutationFn: (values: Values) =>
      apiFetch<User>("/api/users/me", {
        method: "PATCH",
        body: {
          name: values.name.trim(),
          phone: values.phone?.trim() || null,
          image: values.image?.trim() || null,
        },
      }),
    onSuccess: async () => {
      await refreshUser();
      toast.success("Profile updated", {
        description: "Your details are saved and will appear across SalonBook.",
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : "Your profile could not be saved.",
      );
    },
  });

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("That image is too large", { description: "Choose a file under 5 MB." });
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadImage(file);
      form.setValue("image", response.data.url, { shouldValidate: true });
      toast.success("Photo uploaded", { description: "Save your profile to apply it." });
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "The photo could not be uploaded. You can paste an image URL instead.",
      );
    } finally {
      setIsUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <DashboardShell
      role="customer"
      title="My profile"
      description="Keep your contact details and photo up to date so your specialist knows who to expect."
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="surface rounded-lg p-6">
          <p className="eyebrow">Your account</p>
          <div className="mt-5 flex items-center gap-4">
            <Avatar name={user?.name ?? "Guest"} image={imageValue || user?.image} className="size-16" />
            <div className="min-w-0">
              <p className="truncate font-display text-2xl text-ink">{user?.name}</p>
              <p className="truncate text-xs text-muted">{user?.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted">
                <Mail className="size-4" />
                Email
              </span>
              <span className="truncate text-xs text-ink-soft">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted">
                <UserRound className="size-4" />
                Account type
              </span>
              <span className="text-xs capitalize text-ink-soft">{user?.role}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted">
                <ShieldCheck className="size-4" />
                Status
              </span>
              <span className="flex items-center gap-1.5 text-xs text-sage">
                <Check className="size-3.5" />
                Active
              </span>
            </div>
            {user?.createdAt ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted">Member since</span>
                <span className="text-xs text-ink-soft">{formatDate(user.createdAt)}</span>
              </div>
            ) : null}
          </div>

          <p className="mt-6 rounded-md bg-ivory px-3.5 py-3 text-[11px] leading-relaxed text-muted">
            Your email address and account type are managed by SalonBook and cannot be
            changed here. Contact the salon if something needs updating.
          </p>
        </div>

        <div className="surface rounded-lg p-6">
          <p className="eyebrow">Editable details</p>
          <form
            className="mt-5 space-y-4"
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            noValidate
          >
            <Field
              label="Full name"
              htmlFor="name"
              required
              error={form.formState.errors.name?.message}
            >
              <Input
                id="name"
                autoComplete="name"
                invalid={Boolean(form.formState.errors.name)}
                {...form.register("name")}
              />
            </Field>

            <Field
              label="Phone number"
              htmlFor="phone"
              hint="Used only if the salon needs to reach you about an appointment."
              error={form.formState.errors.phone?.message}
            >
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 010-2030"
                invalid={Boolean(form.formState.errors.phone)}
                {...form.register("phone")}
              />
            </Field>

            <Field
              label="Profile photo"
              htmlFor="image"
              hint="Upload a JPEG, PNG, WebP or GIF under 5 MB, or paste an image URL."
              error={form.formState.errors.image?.message}
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="image"
                  placeholder="https://…"
                  invalid={Boolean(form.formState.errors.image)}
                  {...form.register("image")}
                />
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="sr-only"
                  onChange={(event) => void handleFile(event.target.files?.[0])}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInput.current?.click()}
                  isLoading={isUploading}
                  className="shrink-0"
                >
                  <Camera className="size-4" />
                  Upload
                </Button>
              </div>
            </Field>

            {imageValue ? (
              <div className="flex items-center gap-3 rounded-md border border-line bg-ivory/60 p-3">
                <span className="size-12 overflow-hidden rounded-full bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageValue} alt="Profile preview" className="size-full object-cover" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink">Photo preview</p>
                  <p className="truncate text-[11px] text-muted">{imageValue}</p>
                </div>
                <button
                  type="button"
                  onClick={() => form.setValue("image", "", { shouldValidate: true })}
                  className="ml-auto text-[11px] font-medium text-[#8f3229] hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
              <p className="text-[11px] text-muted">Changes appear immediately after saving.</p>
              <Button type="submit" isLoading={mutation.isPending}>
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
