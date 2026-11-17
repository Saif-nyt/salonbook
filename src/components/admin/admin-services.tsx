"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Camera,
  Pencil,
  Plus,
  Power,
  PowerOff,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useServices } from "@/lib/queries";
import { apiFetch, ApiError, uploadImage } from "@/lib/api";
import type { Service } from "@/lib/types";
import { CATEGORY_NAMES } from "@/lib/constants";
import { formatDate, formatMoney } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Badge, ServiceStatusBadge } from "@/components/ui/badge";
import { Modal, ConfirmDialog } from "@/components/ui/modal";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";

const schema = z.object({
  serviceName: z.string().trim().min(2, "Enter a service name").max(120),
  category: z.enum(CATEGORY_NAMES as [string, ...string[]]),
  description: z
    .string()
    .trim()
    .min(20, "Describe the treatment in at least 20 characters")
    .max(1500),
  price: z.number().positive("Price must be greater than zero"),
  duration: z
    .number()
    .int("Duration must be a whole number")
    .min(15, "Duration must be at least 15 minutes")
    .max(600),
  image: z.string().trim().url("Upload an image or paste a valid image URL"),
  status: z.enum(["active", "inactive"]),
});

type Values = z.infer<typeof schema>;

export function AdminServices() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Service | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<Service | null>(null);

  const { data, isLoading, isError, refetch } = useServices({
    includeInactive: true,
    status: status || undefined,
    search: search.trim() || undefined,
    page,
    limit: 8,
    sort: "newest",
  });

  const services = data?.data ?? [];
  const meta = data?.meta;

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["services"] });
    void queryClient.invalidateQueries({ queryKey: ["service-categories"] });
    void queryClient.invalidateQueries({ queryKey: ["dashboard-admin"] });
  };

  const toggleStatus = useMutation({
    mutationFn: (service: Service) =>
      apiFetch<Service>(`/api/services/${service.id}/status`, {
        method: "PATCH",
        body: { status: service.status === "active" ? "inactive" : "active" },
      }),
    onSuccess: (response) => {
      invalidate();
      toast.success(
        response.data.status === "active" ? "Service activated" : "Service paused",
        {
          description:
            response.data.status === "active"
              ? "It is now visible in the public menu."
              : "It is hidden from new bookings.",
        },
      );
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : "The service status was not changed.",
      );
    },
  });

  const deleteService = useMutation({
    mutationFn: (service: Service) =>
      apiFetch<{ id: string }>(`/api/services/${service.id}`, { method: "DELETE" }),
    onSuccess: () => {
      invalidate();
      setDeleting(null);
      toast.success("Service deleted", {
        description: "Existing appointments keep their service snapshot.",
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : "The service could not be deleted.",
      );
    },
  });

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setFormOpen(true);
  };

  return (
    <DashboardShell
      role="admin"
      title="Manage services"
      description="The public treatment menu. Add new services, refine pricing and pause anything that isn't currently offered."
      actions={
        <Button size="sm" onClick={openCreate}>
          <Plus className="size-4" />
          Add service
        </Button>
      }
    >
      <div className="surface flex flex-col gap-3 rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search services"
              aria-label="Search services"
              className="h-10 w-full rounded-md border border-line bg-cream pl-9 pr-3 text-xs text-ink placeholder:text-muted/70 focus:border-terracotta focus:outline-none sm:w-64"
            />
          </div>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            aria-label="Filter services by status"
            className="h-10 rounded-md border border-line bg-cream px-3 text-xs text-ink focus:border-terracotta focus:outline-none"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <p className="text-xs text-muted">
          {meta ? `${meta.total} service${meta.total === 1 ? "" : "s"}` : "Loading"}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-5">
          <TableSkeleton rows={5} />
        </div>
      ) : isError ? (
        <div className="surface mt-5 rounded-lg p-10 text-center">
          <p className="font-display text-2xl text-ink">Services didn&apos;t load.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 text-xs font-semibold text-terracotta hover:underline"
          >
            Try again
          </button>
        </div>
      ) : services.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={Sparkles}
            title="The menu is empty"
            description="Add the first treatment to make it available for booking on the public site."
            action={{ label: "Add a service", href: "/admin/services" }}
          />
        </div>
      ) : (
        <div className="mt-5 overflow-hidden rounded-lg border border-line bg-cream">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[54rem] text-left text-sm">
              <thead className="border-b border-line bg-ivory/70 text-[10px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Added</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="size-10 shrink-0 overflow-hidden rounded-md bg-sand">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={service.image}
                            alt=""
                            className="size-full object-cover"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="max-w-56 truncate font-medium text-ink">
                            {service.serviceName}
                          </p>
                          <p className="line-clamp-1 max-w-56 text-[11px] text-muted">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone="neutral">{service.category}</Badge>
                    </td>
                    <td className="px-4 py-3 font-display text-lg text-ink">
                      {formatMoney(service.price)}
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-soft">
                      {service.duration} min
                    </td>
                    <td className="px-4 py-3">
                      <ServiceStatusBadge status={service.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {formatDate(service.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(service)}
                          className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-sand hover:text-ink"
                          aria-label={`Edit ${service.serviceName}`}
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStatus.mutate(service)}
                          disabled={toggleStatus.isPending}
                          className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-sand hover:text-ink disabled:opacity-50"
                          aria-label={
                            service.status === "active"
                              ? `Pause ${service.serviceName}`
                              : `Activate ${service.serviceName}`
                          }
                        >
                          {service.status === "active" ? (
                            <PowerOff className="size-3.5" />
                          ) : (
                            <Power className="size-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleting(service)}
                          className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-[#f4e0dc] hover:text-[#8f3229]"
                          aria-label={`Delete ${service.serviceName}`}
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {meta ? (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          onChange={setPage}
        />
      ) : null}

      <ServiceFormModal
        key={editing?.id ?? "new"}
        open={formOpen}
        service={editing}
        onClose={() => setFormOpen(false)}
        onSaved={() => {
          setFormOpen(false);
          invalidate();
        }}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteService.mutate(deleting)}
        isLoading={deleteService.isPending}
        title="Delete this service?"
        description={
          deleting
            ? `${deleting.serviceName} will be removed from the menu. Existing appointments keep a snapshot of the service.`
            : ""
        }
        confirmLabel="Delete service"
      />
    </DashboardShell>
  );
}

function ServiceFormModal({
  open,
  service,
  onClose,
  onSaved,
}: {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceName: service?.serviceName ?? "",
      category: service?.category ?? "Hair",
      description: service?.description ?? "",
      price: service?.price ?? 80,
      duration: service?.duration ?? 60,
      image: service?.image ?? "",
      status: service?.status ?? "active",
    },
  });

  const imageValue = form.watch("image");

  const mutation = useMutation({
    mutationFn: (values: Values) =>
      service
        ? apiFetch<Service>(`/api/services/${service.id}`, {
            method: "PATCH",
            body: values,
          })
        : apiFetch<Service>("/api/services", { method: "POST", body: values }),
    onSuccess: () => {
      toast.success(service ? "Service updated" : "Service added", {
        description: service
          ? "The changes are live on the public menu."
          : "The new treatment is ready for bookings.",
      });
      onSaved();
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : "The service could not be saved.",
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
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "The image could not be uploaded. Paste an image URL instead.",
      );
    } finally {
      setIsUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={service ? "Edit service" : "Add a service"}
      description={
        service
          ? "Update the details shown on the public treatment page."
          : "Create a treatment guests can browse and request."
      }
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="service-form"
            isLoading={mutation.isPending || isUploading}
          >
            {service ? "Save changes" : "Create service"}
          </Button>
        </>
      }
    >
      <form
        id="service-form"
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Service name"
            htmlFor="serviceName"
            required
            error={form.formState.errors.serviceName?.message}
          >
            <Input
              id="serviceName"
              placeholder="Signature Cut & Style"
              invalid={Boolean(form.formState.errors.serviceName)}
              {...form.register("serviceName")}
            />
          </Field>

          <Field
            label="Category"
            htmlFor="category"
            required
            error={form.formState.errors.category?.message}
          >
            <Select id="category" {...form.register("category")}>
              {CATEGORY_NAMES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field
          label="Description"
          htmlFor="description"
          required
          error={form.formState.errors.description?.message}
        >
          <Textarea
            id="description"
            placeholder="Describe the treatment, what it includes and how it feels…"
            invalid={Boolean(form.formState.errors.description)}
            {...form.register("description")}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Price (USD)"
            htmlFor="price"
            required
            error={form.formState.errors.price?.message}
          >
            <Input
              id="price"
              type="number"
              min="1"
              step="0.01"
              invalid={Boolean(form.formState.errors.price)}
              {...form.register("price", { valueAsNumber: true })}
            />
          </Field>

          <Field
            label="Duration (minutes)"
            htmlFor="duration"
            required
            error={form.formState.errors.duration?.message}
          >
            <Input
              id="duration"
              type="number"
              min="15"
              step="5"
              invalid={Boolean(form.formState.errors.duration)}
              {...form.register("duration", { valueAsNumber: true })}
            />
          </Field>

          <Field
            label="Status"
            htmlFor="status"
            required
            error={form.formState.errors.status?.message}
          >
            <Select id="status" {...form.register("status")}>
              <option value="active">Active — bookable</option>
              <option value="inactive">Inactive — hidden</option>
            </Select>
          </Field>
        </div>

        <Field
          label="Service image"
          htmlFor="image"
          required
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
            <span className="h-16 w-24 shrink-0 overflow-hidden rounded bg-sand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageValue} alt="Service preview" className="size-full object-cover" />
            </span>
            <p className="min-w-0 flex-1 truncate text-[11px] text-muted">{imageValue}</p>
          </div>
        ) : null}
      </form>
    </Modal>
  );
}
