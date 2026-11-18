"use client";

import { useState } from "react";
import { CalendarDays, Eye, MessageSquare, Search } from "lucide-react";
import { useAdminAppointments } from "@/lib/queries";
import { formatDate, formatDateTime, formatMoney, formatTimeSlot } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AppointmentActions } from "@/components/dashboard/appointment-actions";
import { AppointmentStatusBadge, PaymentStatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import type { Appointment } from "@/lib/types";

const statuses = [
  { value: "", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

const paymentStatuses = [
  { value: "", label: "All payments" },
  { value: "unpaid", label: "Unpaid" },
  { value: "paid", label: "Paid" },
];

export function AdminAppointments() {
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Appointment | null>(null);

  const { data, isLoading, isError, refetch } = useAdminAppointments({
    status: status || undefined,
    paymentStatus: paymentStatus || undefined,
    search: search.trim() || undefined,
    page,
    limit: 10,
  });

  const appointments = data?.data ?? [];
  const meta = data?.meta;

  return (
    <DashboardShell
      role="admin"
      title="Manage appointments"
      description="Review requests, confirm pending visits and cancel when plans change. Only pending appointments can be confirmed."
    >
      <div className="surface flex flex-col gap-3 rounded-[20px] p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search service or customer"
              aria-label="Search appointments"
              className="h-10 w-full rounded-[11px] border border-warm-taupe/55 bg-warm-cream/35 pl-9 pr-3 text-xs text-charcoal placeholder:text-muted/70 transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10 sm:w-64"
            />
          </div>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by appointment status"
            className="h-10 rounded-[11px] border border-warm-taupe/55 bg-warm-cream/35 px-3 text-xs font-medium text-charcoal transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10"
          >
            {statuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={paymentStatus}
            onChange={(event) => {
              setPaymentStatus(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by payment status"
            className="h-10 rounded-[11px] border border-warm-taupe/55 bg-warm-cream/35 px-3 text-xs font-medium text-charcoal transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10"
          >
            {paymentStatuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs font-medium text-muted">
          {meta ? `${meta.total} appointment${meta.total === 1 ? "" : "s"}` : "Loading"}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-5">
          <TableSkeleton rows={6} />
        </div>
      ) : isError ? (
        <div className="surface mt-5 rounded-[20px] p-10 text-center">
          <p className="font-display text-2xl text-charcoal">Appointments didn&apos;t load.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 text-xs font-semibold text-deep-red hover:underline"
          >
            Try again
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={CalendarDays}
            title="No appointments match"
            description="Try clearing the search or choosing a different status. New requests appear here as soon as guests book."
          />
        </div>
      ) : (
        <div className="surface mt-5 overflow-hidden rounded-[20px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[62rem] text-left text-sm">
              <thead className="border-b border-warm-taupe/35 bg-warm-cream/45 text-[10px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Visit</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-taupe/30">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="transition-colors hover:bg-warm-cream/25">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          name={appointment.customer?.name ?? "Customer"}
                          image={appointment.customer?.image}
                          className="size-8"
                        />
                        <div className="min-w-0">
                          <p className="max-w-40 truncate font-medium text-charcoal">
                            {appointment.customer?.name ?? "Customer"}
                          </p>
                          <p className="max-w-40 truncate text-[11px] text-muted">
                            {appointment.customer?.email ?? appointment.customerId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="size-8 shrink-0 overflow-hidden rounded-[10px] bg-sand ring-1 ring-warm-taupe/25">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={appointment.service.image}
                            alt=""
                            className="size-full object-cover"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="max-w-44 truncate font-medium text-charcoal">
                            {appointment.service.name}
                          </p>
                          <p className="text-[11px] text-muted">
                            {appointment.service.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {formatDate(appointment.appointmentDate)}
                      <br />
                      <span className="text-muted">
                        {formatTimeSlot(appointment.timeSlot)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-display text-lg text-charcoal">
                      {formatMoney(appointment.servicePrice)}
                    </td>
                    <td className="px-4 py-3">
                      <AppointmentStatusBadge status={appointment.status} />
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={appointment.paymentStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelected(appointment)}
                          className="grid size-8 place-items-center rounded-[10px] text-muted transition-colors hover:bg-warm-cream hover:text-charcoal"
                          aria-label="View appointment details"
                        >
                          <Eye className="size-3.5" />
                        </button>
                        <AppointmentActions
                          appointment={appointment}
                          mode="admin"
                          showDetails={false}
                        />
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
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.service.name ?? "Appointment"}
        description={
          selected
            ? `Requested ${formatDateTime(selected.createdAt)} by ${selected.customer?.name ?? "a customer"}`
            : ""
        }
        size="md"
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <AppointmentStatusBadge status={selected.status} />
              <PaymentStatusBadge status={selected.paymentStatus} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Customer" value={selected.customer?.name ?? "Customer"} />
              <Detail label="Email" value={selected.customer?.email ?? "—"} />
              <Detail label="Phone" value={selected.customer?.phone ?? "Not provided"} />
              <Detail label="Category" value={selected.service.category} />
              <Detail
                label="Appointment date"
                value={formatDate(selected.appointmentDate)}
              />
              <Detail
                label="Time"
                value={`${formatTimeSlot(selected.timeSlot)} · ${selected.service.duration} min`}
              />
              <Detail label="Service price" value={formatMoney(selected.servicePrice)} />
              <Detail label="Account status" value={selected.customer?.isBlocked ? "Blocked" : "Active"} />
            </div>

            <div className="rounded-[16px] border border-warm-taupe/35 bg-warm-cream/35 p-4">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                <MessageSquare className="size-3.5" />
                Customer message
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {selected.message || "No message was included with this request."}
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-warm-taupe/35 pt-4">
              <AppointmentActions
                appointment={selected}
                mode="admin"
                showDetails={false}
              />
            </div>
          </div>
        ) : null}
      </Modal>
    </DashboardShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 text-sm text-charcoal">{value}</p>
    </div>
  );
}
