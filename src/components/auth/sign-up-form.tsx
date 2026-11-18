"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Eye, EyeOff, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-context";
import { safeRedirect } from "@/lib/utils";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "./google-button";

const schema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name").max(80),
    email: z.string().trim().email("Enter a valid email address"),
    password: z
      .string()
      .min(6, "Use at least 6 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[a-z]/, "Include at least one lowercase letter"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    image: z
      .string()
      .trim()
      .url("Enter a valid image URL")
      .optional()
      .or(z.literal("")),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type Values = z.infer<typeof schema>;

const passwordRules = [
  { label: "6+ characters", test: (value: string) => value.length >= 6 },
  { label: "One uppercase", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One lowercase", test: (value: string) => /[a-z]/.test(value) },
];

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const redirectTo = safeRedirect(searchParams.get("redirect"), "/dashboard");

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
  });

  const password = form.watch("password");
  const imageValue = form.watch("image");

  const onSubmit = form.handleSubmit(async (values) => {
    const { error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      ...(values.image ? { image: values.image.trim() } : {}),
    });

    if (error) {
      const message =
        error.status === 422 || error.status === 400
          ? error.message || "Please check the details you entered."
          : (error.message ?? "We couldn't create your account. Please try again.");
      form.setError("root", { message });
      toast.error(message);
      return;
    }

    const user = await completeSignIn();
    toast.success("Your account is ready", {
      description: "You can now request appointments at SalonBook.",
    });
    router.push(redirectTo);
    router.refresh();
    if (!user) {
      router.push(`/sign-in?redirect=${encodeURIComponent(redirectTo)}`);
    }
  });

  return (
    <div className="space-y-6">
      <GoogleButton
        callbackPath={searchParams.get("redirect") ? redirectTo : "/auth/redirect"}
        label="Sign up with Google"
      />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
          or with email
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="Full name"
          htmlFor="name"
          required
          error={form.formState.errors.name?.message}
        >
          <Input
            id="name"
            autoComplete="name"
            placeholder="Maya Chen"
            invalid={Boolean(form.formState.errors.name)}
            {...form.register("name")}
          />
        </Field>

        <Field
          label="Email address"
          htmlFor="email"
          required
          error={form.formState.errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            invalid={Boolean(form.formState.errors.email)}
            {...form.register("email")}
          />
        </Field>

        <Field
          label="Profile image URL"
          htmlFor="image"
          hint="Optional. Provide a public image URL — you can add or update your photo after signing in."
          error={form.formState.errors.image?.message}
        >
          <Input
            id="image"
            type="url"
            placeholder="https://…"
            invalid={Boolean(form.formState.errors.image)}
            {...form.register("image")}
          />
        </Field>

        {imageValue ? (
          <div className="flex items-center gap-3 rounded-[14px] border border-warm-taupe/40 bg-warm-cream/35 p-3">
            <span className="size-10 overflow-hidden rounded-full bg-sand ring-1 ring-warm-taupe/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageValue} alt="Profile preview" className="size-full object-cover" />
            </span>
            <p className="min-w-0 flex-1 truncate text-xs text-muted">{imageValue}</p>
            <button
              type="button"
              onClick={() => form.setValue("image", "", { shouldValidate: true })}
              className="text-[11px] font-semibold text-error underline-offset-4 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : null}

        <Field
          label="Password"
          htmlFor="password"
          required
          error={form.formState.errors.password?.message}
        >
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              className="pr-11"
              invalid={Boolean(form.formState.errors.password)}
              {...form.register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded text-muted hover:text-charcoal"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {passwordRules.map((rule) => {
              const passed = rule.test(password);
              return (
                <span
                  key={rule.label}
                  className={`flex items-center gap-1 text-[11px] font-medium ${
                    passed ? "text-success" : "text-muted"
                  }`}
                >
                  <Check className={`size-3 ${passed ? "opacity-100" : "opacity-30"}`} />
                  {rule.label}
                </span>
              );
            })}
          </div>
        </Field>

        <Field
          label="Confirm password"
          htmlFor="confirmPassword"
          required
          error={form.formState.errors.confirmPassword?.message}
        >
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repeat your password"
            invalid={Boolean(form.formState.errors.confirmPassword)}
            {...form.register("confirmPassword")}
          />
        </Field>

        {form.formState.errors.root?.message ? (
          <p
            className="rounded-[12px] border border-error/20 bg-[#f7e6e4] px-3 py-2.5 text-xs font-medium leading-relaxed text-[#8f241d]"
            role="alert"
          >
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
          <UserPlus className="size-4" />
          Create account
        </Button>
      </form>

      <p className="text-center text-xs leading-relaxed text-muted">
        Already have an account?{" "}
        <Link
          href={
            searchParams.get("redirect")
              ? `/sign-in?redirect=${encodeURIComponent(redirectTo)}`
              : "/sign-in"
          }
          className="font-semibold text-deep-red underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
