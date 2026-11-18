"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Ban, CheckCircle2, Eye, Search, ShieldCheck, UserRound, Users } from "lucide-react";
import { useCustomerDetails, useCustomers } from "@/lib/queries";
import { apiFetch, ApiError } from "@/lib/api";
import type { User } from "@/lib/types";
import { formatDate, formatMoney, formatTimeSlot } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Avatar } from "@/components/ui/avatar";
import { Badge, AppointmentStatusBadge, PaymentStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal, ConfirmDialog } from "@/components/ui/modal";
import { TableSkeleton, Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";

export function AdminUsers() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [blocking, setBlocking] = useState<User | null>(null);

  const { data, isLoading, isError, refetch } = useCustomers({
    search: search.trim() || undefined,
    page,
  });
  const details = useCustomerDetails(selectedId);
  const customers = data?.data ?? [];
  const meta = data?.meta;

  const blockMutation = useMutation({
    mutationFn: (user: User) =>
      apiFetch<User>(`/api/users/${user.id}/${user.isBlocked ? "unblock" : "block"}`, {
        method: "PATCH",
      }),
    onSuccess: (response) => {
      toast.success(
        response.data.isBlocked ? "Customer blocked" : "Customer unblocked",
        {
          description: response.data.isBlocked
            ? "Their active sessions are revoked and protected features are unavailable."
            : "The customer can sign in and book again.",
        },
      );
      setBlocking(null);
      void queryClient.invalidateQueries({ queryKey: ["customers"] });
      void queryClient.invalidateQueries({ queryKey: ["customer-details"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboard-admin"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : "The customer status was not changed.",
      );
    },
  });

  return (
    <DashboardShell
      role="admin"
      title="Customers"
      description="Everyone with a SalonBook account, their visit history and account access."
    >
      <div className="surface flex flex-col gap-3 rounded-[20px] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search name, email or phone"
            aria-label="Search customers"
            className="h-10 w-full rounded-[11px] border border-warm-taupe/55 bg-warm-cream/35 pl-9 pr-3 text-xs text-charcoal placeholder:text-muted/70 transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10 sm:w-72"
          />
        </div>
        <p className="text-xs font-medium text-muted">
          {meta ? `${meta.total} customer${meta.total === 1 ? "" : "s"}` : "Loading"}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-5">
          <TableSkeleton rows={6} />
        </div>
      ) : isError ? (
        <div className="surface mt-5 rounded-[20px] p-10 text-center">
          <p className="font-display text-2xl text-charcoal">Customers didn&apos;t load.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 text-xs font-semibold text-deep-red hover:underline"
          >
            Try again
          </button>
        </div>
      ) : customers.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={Users}
            title="No customers found"
            description="When guests create accounts they will appear here. Try a different search if you expected someone."
          />
        </div>
      ) : (
        <div className="surface mt-5 overflow-hidden rounded-[20px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[48rem] text-left text-sm">
              <thead className="border-b border-warm-taupe/35 bg-warm-cream/45 text-[10px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Joined</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-taupe/30">
                {customers.map((customer) => (
                  <tr key={customer.id} className="transition-colors hover:bg-warm-cream/25">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={customer.name} image={customer.image} className="size-9" />
                        <div className="min-w-0">
                          <p className="max-w-52 truncate font-medium text-charcoal">
                            {customer.name}
                          </p>
                          <p className="max-w-52 truncate text-[11px] text-muted">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {customer.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {formatDate(customer.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {customer.isBlocked ? (
                        <Badge tone="danger">Blocked</Badge>
                      ) : (
                        <Badge tone="success">Active</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedId(customer.id)}
                          className="grid size-8 place-items-center rounded-[10px] text-muted transition-colors hover:bg-warm-cream hover:text-charcoal"
                          aria-label={`View ${customer.name}`}
                        >
                          <Eye className="size-3.5" />
                        </button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setBlocking(customer)}
                          className={customer.isBlocked ? "" : "border-error/30 text-[#8f241d] hover:bg-error/5"}
                        >
                          {customer.isBlocked ? (
                            <>
                              <CheckCircle2 className="size-3.5" />
                              Unblock
                            </>
                          ) : (
                            <>
                              <Ban className="size-3.5" />
                              Block
                            </>
                          )}
                        </Button>
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

      <Modal
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        title={details.data?.data?.customer?.name ?? "Customer details"}
        description={details.data?.data?.customer?.email}
        size="lg"
      >
        {details.isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : details.isError || !details.data?.data ? (
          <p className="text-sm text-muted">This customer could not be loaded.</p>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Avatar
                name={details.data.data.customer.name}
                image={details.data.data.customer.image}
                className="size-12"
              />
              <div>
                <p className="font-display text-xl text-charcoal">
                  {details.data.data.customer.name}
                </p>
                <p className="text-xs text-muted">
                  Joined {formatDate(details.data.data.customer.createdAt)}
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                {details.data.data.customer.isBlocked ? (
                  <Badge tone="danger">Blocked</Badge>
                ) : (
                  <Badge tone="success">Active</Badge>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {[
                { label: "Total", value: details.data.data.appointmentCounts.total },
                { label: "Pending", value: details.data.data.appointmentCounts.pending },
                { label: "Confirmed", value: details.data.data.appointmentCounts.confirmed },
                { label: "Cancelled", value: details.data.data.appointmentCounts.cancelled },
              ].map((item) => (
                <div key={item.label} className="rounded-[14px] border border-warm-taupe/35 bg-warm-cream/35 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-2xl text-charcoal">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 rounded-[16px] border border-warm-taupe/35 p-4 sm:grid-cols-2">
              <InfoRow icon={UserRound} label="Phone" value={details.data.data.customer.phone || "Not provided"} />
              <InfoRow icon={ShieldCheck} label="Role" value={details.data.data.customer.role} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Recent appointments
              </p>
              {details.data.data.recentAppointments.length === 0 ? (
                <p className="mt-3 text-sm text-muted">No appointments yet.</p>
              ) : (
                <ul className="mt-3 divide-y divide-warm-taupe/30 rounded-[16px] border border-warm-taupe/35">
                  {details.data.data.recentAppointments.map((appointment) => (
                    <li key={appointment.id} className="flex flex-wrap items-center gap-3 p-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-charcoal">
                          {appointment.service.name}
                        </p>
                        <p className="text-[11px] text-muted">
                          {formatDate(appointment.appointmentDate)} ·{" "}
                          {formatTimeSlot(appointment.timeSlot)} ·{" "}
                          {formatMoney(appointment.servicePrice)}
                        </p>
                      </div>
                      <AppointmentStatusBadge status={appointment.status} />
                      <PaymentStatusBadge status={appointment.paymentStatus} />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end border-t border-warm-taupe/35 pt-4">
              <Button
                variant={details.data.data.customer.isBlocked ? "primary" : "danger"}
                size="sm"
                onClick={() => setBlocking(details.data.data.customer)}
              >
                {details.data.data.customer.isBlocked ? (
                  <>
                    <CheckCircle2 className="size-3.5" />
                    Unblock customer
                  </>
                ) : (
                  <>
                    <Ban className="size-3.5" />
                    Block customer
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(blocking)}
        onClose={() => setBlocking(null)}
        onConfirm={() => blocking && blockMutation.mutate(blocking)}
        isLoading={blockMutation.isPending}
        destructive={!blocking?.isBlocked}
        title={blocking?.isBlocked ? "Unblock this customer?" : "Block this customer?"}
        description={
          blocking?.isBlocked
            ? `${blocking.name} will be able to sign in and book appointments again.`
            : `${blocking?.name ?? "This customer"} will be signed out, unable to sign in, and blocked from booking. Existing appointments are not changed.`
        }
        confirmLabel={blocking?.isBlocked ? "Unblock customer" : "Block customer"}
      />
    </DashboardShell>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <Icon className="size-4 text-muted" />
      <span className="text-muted">{label}</span>
      <span className="ml-auto capitalize text-charcoal">{value}</span>
    </div>
  );
}
