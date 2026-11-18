"use client";

import { useState } from "react";
import { CreditCard, Receipt, ShieldCheck } from "lucide-react";
import { useAdminTransactions } from "@/lib/queries";
import { formatDate, formatMoney, formatTimeSlot, shortId } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Avatar } from "@/components/ui/avatar";
import { TransactionStatusBadge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";

const statuses = [
  { value: "", label: "All transactions" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "cancelled", label: "Cancelled" },
];

export function AdminTransactions() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useAdminTransactions({
    status: status || undefined,
    page,
  });

  const transactions = data?.data ?? [];
  const meta = data?.meta;
  const paidTotal = transactions
    .filter((transaction) => transaction.status === "paid")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <DashboardShell
      role="admin"
      title="Transactions"
      description="Every checkout session and its verified state. Payment status is controlled exclusively by Stripe webhooks."
    >
      <div className="surface flex flex-col gap-3 rounded-[20px] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          aria-label="Filter transactions by status"
          className="h-10 rounded-[11px] border border-warm-taupe/55 bg-warm-cream/35 px-3 text-xs font-medium text-charcoal transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10"
        >
          {statuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-5">
          <p className="text-xs text-muted">
            {meta ? `${meta.total} transaction${meta.total === 1 ? "" : "s"}` : "Loading"}
          </p>
          <p className="text-xs text-muted">
            Paid on page:{" "}
            <span className="font-semibold text-charcoal">{formatMoney(paidTotal)}</span>
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-5">
          <TableSkeleton rows={6} />
        </div>
      ) : isError ? (
        <div className="surface mt-5 rounded-[20px] p-10 text-center">
          <p className="font-display text-2xl text-charcoal">Transactions didn&apos;t load.</p>
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
            title="No transactions yet"
            description="Checkout sessions appear here as soon as a customer starts paying for a confirmed appointment."
          />
        </div>
      ) : (
        <div className="surface mt-5 overflow-hidden rounded-[20px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[66rem] text-left text-sm">
              <thead className="border-b border-warm-taupe/35 bg-warm-cream/45 text-[10px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Appointment</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Currency</th>
                  <th className="px-4 py-3 font-semibold">Stripe session</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-taupe/30">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="transition-colors hover:bg-warm-cream/25">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          name={transaction.customer?.name ?? "Customer"}
                          image={transaction.customer?.image}
                          className="size-8"
                        />
                        <div className="min-w-0">
                          <p className="max-w-40 truncate font-medium text-charcoal">
                            {transaction.customer?.name ?? "Customer"}
                          </p>
                          <p className="max-w-40 truncate text-[11px] text-muted">
                            {transaction.customer?.email ?? transaction.customerId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="size-8 shrink-0 overflow-hidden rounded-[10px] bg-sand ring-1 ring-warm-taupe/25">
                          {transaction.appointment ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={transaction.appointment.serviceImage}
                              alt=""
                              className="size-full object-cover"
                            />
                          ) : null}
                        </span>
                        <span className="max-w-44 truncate font-medium text-charcoal">
                          {transaction.appointment?.serviceName ?? "Appointment"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {transaction.appointment
                        ? `${formatDate(transaction.appointment.date)} · ${formatTimeSlot(transaction.appointment.timeSlot)}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 font-display text-lg text-charcoal">
                      {formatMoney(transaction.amount, transaction.currency)}
                    </td>
                    <td className="px-4 py-3 text-xs uppercase text-muted">
                      {transaction.currency}
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-[11px] text-muted"
                      title={transaction.stripeSessionId}
                    >
                      {shortId(transaction.stripeSessionId, 18)}
                    </td>
                    <td className="px-4 py-3">
                      <TransactionStatusBadge status={transaction.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
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

      <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-[#cfe3d8] bg-sage-soft/60 p-4 sm:p-5">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
        <div>
          <p className="text-sm font-semibold text-charcoal">Payment status is read-only</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            There is intentionally no control here to mark a transaction paid. Only a
            signature-verified Stripe webhook can change payment state or create a paid
            transaction.
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted">
            <CreditCard className="size-3.5" />
            Powered by Stripe test mode
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
