"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useMyAppointments } from "@/lib/queries";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { buttonStyles } from "@/components/ui/button";

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

export function CustomerAppointments() {
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching, refetch } = useMyAppointments({
    status: status || undefined,
    paymentStatus: paymentStatus || undefined,
    page,
    limit: 8,
  });

  const appointments = data?.data ?? [];
  const meta = data?.meta;
  const filtered = Boolean(status || paymentStatus);

  return (
    <DashboardShell
      role="customer"
      title="My appointments"
      description="Every request, confirmation and payment status in one place. Cancel pending requests or pay for confirmed visits."
      actions={
        <Link href="/services" className={buttonStyles({ size: "sm" })}>
          New appointment
          <ArrowRight className="size-3.5" />
        </Link>
      }
    >
      <div className="surface flex flex-col gap-3 rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="h-10 rounded-md border border-line bg-cream px-3 text-xs text-ink focus:border-terracotta focus:outline-none"
            aria-label="Filter by appointment status"
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
            className="h-10 rounded-md border border-line bg-cream px-3 text-xs text-ink focus:border-terracotta focus:outline-none"
            aria-label="Filter by payment status"
          >
            {paymentStatuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {filtered ? (
            <button
              type="button"
              onClick={() => {
                setStatus("");
                setPaymentStatus("");
                setPage(1);
              }}
              className="text-xs font-medium text-terracotta underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </div>
        <p className="text-xs text-muted">
          {meta ? `${meta.total} appointment${meta.total === 1 ? "" : "s"}` : "Loading"}
        </p>
      </div>

      <div className={`mt-5 space-y-3 transition-opacity ${isFetching && !isLoading ? "opacity-60" : ""}`}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full rounded-lg" />
          ))
        ) : isError ? (
          <div className="surface rounded-lg p-10 text-center">
            <p className="font-display text-2xl text-ink">Your appointments didn&apos;t load.</p>
            <p className="mt-2 text-sm text-muted">Check your connection, then try again.</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className={buttonStyles({ variant: "outline", size: "sm", className: "mt-5" })}
            >
              Try again
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title={filtered ? "No appointments match these filters" : "No appointments yet"}
            description={
              filtered
                ? "Try a different status or clear the filters to see your full history."
                : "When you request a treatment it will appear here, along with its status and payment details."
            }
            action={{ label: "Browse the menu", href: "/services" }}
          />
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        )}
      </div>

      {meta ? (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          onChange={setPage}
        />
      ) : null}
    </DashboardShell>
  );
}
