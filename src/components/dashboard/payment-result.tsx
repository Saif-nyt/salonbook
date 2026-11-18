"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, Clock3, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { usePaymentStatus } from "@/lib/queries";
import { formatMoney } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { buttonStyles } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { data, isLoading, isError } = usePaymentStatus(sessionId);
  const status = data?.data;
  const paid = status?.paymentStatus === "paid";

  return (
    <DashboardShell
      role="customer"
      title="Payment confirmation"
      description="We verify every payment with Stripe before updating your appointment."
    >
      <div className="mx-auto max-w-2xl">
        <div className="surface rounded-lg p-8 text-center">
          {isLoading ? (
            <>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-sand text-deep-red">
                <Loader2 className="size-6 animate-spin" />
              </span>
              <h2 className="mt-5 font-display text-3xl text-charcoal">
                Confirming with Stripe…
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Hold this page open for a moment. We&apos;re waiting for the verified
                payment event before marking your appointment as paid.
              </p>
              <Skeleton className="mx-auto mt-6 h-10 w-48" />
            </>
          ) : isError || !status ? (
            <>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#f6e3e1] text-[#8f241d]">
                <XCircle className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-3xl text-charcoal">
                We couldn&apos;t find that payment.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                The checkout reference is missing or doesn&apos;t belong to your account.
                You can review your payment history and appointments at any time.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href="/dashboard/payments" className={buttonStyles({ size: "sm" })}>
                  Payment history
                </Link>
                <Link
                  href="/dashboard/appointments"
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  My appointments
                </Link>
              </div>
            </>
          ) : paid ? (
            <>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-sage-soft text-sage">
                <CheckCircle2 className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-3xl text-charcoal">Payment received.</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Stripe has confirmed your payment and your appointment is now paid. A
                receipt is available in your payment history.
              </p>
              <p className="mt-5 font-display text-4xl text-deep-red">
                {formatMoney(status.amount, status.currency)}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  href="/dashboard/appointments"
                  className={buttonStyles({ size: "sm" })}
                >
                  View appointment
                </Link>
                <Link
                  href="/dashboard/payments"
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  Payment history
                </Link>
              </div>
            </>
          ) : status.transactionStatus === "failed" ||
            status.transactionStatus === "cancelled" ? (
            <>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#f6e3e1] text-[#8f241d]">
                <XCircle className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-3xl text-charcoal">
                That payment didn&apos;t complete.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                No payment was taken. You can open the appointment and try checkout
                again whenever you&apos;re ready.
              </p>
              <Link
                href="/dashboard/appointments"
                className={buttonStyles({ size: "sm", className: "mt-6" })}
              >
                Return to appointments
              </Link>
            </>
          ) : (
            <>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#f3e6cf] text-[#7b5a1f]">
                <Clock3 className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-3xl text-charcoal">
                Waiting for confirmation.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Stripe is still processing this payment. This page checks again
                automatically — you can also come back to your payment history later.
              </p>
              <Link
                href="/dashboard/payments"
                className={buttonStyles({ variant: "outline", size: "sm", className: "mt-6" })}
              >
                Payment history
              </Link>
            </>
          )}
        </div>

        <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-sage" />
          Reaching this page never marks an appointment as paid. Payment status changes
          only when the Stripe webhook signature is verified by the SalonBook server.
        </p>
      </div>
    </DashboardShell>
  );
}

export function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-16">
          <Skeleton className="mx-auto h-72 max-w-2xl rounded-lg" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
