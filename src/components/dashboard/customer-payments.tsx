"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Receipt } from "lucide-react";
import { useMyTransactions } from "@/lib/queries";
import { formatDate, formatMoney, formatTimeSlot, shortId } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { TransactionStatusBadge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";

const statuses = [
  { value: "", label: "All transactions" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "cancelled", label: "Cancelled" },
];

export function CustomerPayments() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useMyTransactions({
    status: status || undefined,
    page,
  });
  const transactions = data?.data ?? [];
  const meta = data?.meta;

  return (
    <DashboardShell
      role="customer"
      title="Payments"
      description="A record of every checkout started from your appointments. Only verified Stripe payments are marked paid."
      actions={
        <Link
          href="/dashboard/appointments"
          className="text-xs font-medium text-deep-red hover:underline"
        >
          Back to appointments
        </Link>
      }
    >
      <div className="surface flex flex-wrap items-center justify-between gap-3 rounded-lg p-4">
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border border-line bg-cream px-3 text-xs text-charcoal focus:border-deep-red focus:outline-none"
          aria-label="Filter transactions by status"
        >
          {statuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted">
          {meta ? `${meta.total} transaction${meta.total === 1 ? "" : "s"}` : "Loading"}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-5">
          <TableSkeleton rows={4} />
        </div>
      ) : isError ? (
        <div className="surface mt-5 rounded-lg p-10 text-center">
          <p className="font-display text-2xl text-charcoal">Payments didn&apos;t load.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 text-xs font-semibold text-deep-red hover:underline"
          >
            Try again
          </button>
        </div>
      ) : transactions.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={Receipt}
            title="No payments yet"
            description="Once your appointment is confirmed, you can pay through Stripe and the receipt will appear here."
            action={{ label: "View appointments", href: "/dashboard/appointments" }}
          />
        </div>
      ) : (
        <div className="mt-5 overflow-hidden rounded-lg border border-line bg-cream">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <thead className="border-b border-line bg-ivory/70 text-[10px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Treatment</th>
                  <th className="px-4 py-3 font-semibold">Appointment</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="align-middle">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="size-9 shrink-0 overflow-hidden rounded-md bg-sand">
                          {transaction.appointment ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={transaction.appointment.serviceImage}
                              alt=""
                              className="size-full object-cover"
                            />
                          ) : null}
                        </span>
                        <span className="font-medium text-charcoal">
                          {transaction.appointment?.serviceName ?? "Appointment"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted">
                      {transaction.appointment
                        ? `${formatDate(transaction.appointment.date)} · ${formatTimeSlot(transaction.appointment.timeSlot)}`
                        : "—"}
                    </td>
                    <td className="px-4 py-4 font-display text-lg text-charcoal">
                      {formatMoney(transaction.amount, transaction.currency)}
                    </td>
                    <td className="px-4 py-4 font-mono text-[11px] text-muted" title={transaction.stripeSessionId}>
                      {shortId(transaction.stripeSessionId, 16)}
                    </td>
                    <td className="px-4 py-4">
                      <TransactionStatusBadge status={transaction.status} />
                    </td>
                    <td className="px-4 py-4 text-xs text-muted">
                      {formatDate(transaction.createdAt)}
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

      <p className="mt-6 flex items-start gap-2 text-[11px] leading-relaxed text-muted">
        <CreditCard className="mt-0.5 size-3.5 shrink-0 text-sage" />
        Card details are never stored by SalonBook. Payment confirmation comes directly
        from Stripe&apos;s verified webhook.
      </p>
    </DashboardShell>
  );
}
