"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, CreditCard, XCircle } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { buttonStyles } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment_id");

  return (
    <DashboardShell
      role="customer"
      title="Checkout cancelled"
      description="No payment was taken. Your appointment remains confirmed and unpaid."
    >
      <div className="mx-auto max-w-2xl">
        <div className="surface rounded-[22px] p-8 text-center shadow-card sm:p-10">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#f8efe2] text-warning">
            <XCircle className="size-6" />
          </span>
          <h2 className="mt-5 font-display text-3xl text-charcoal">
            Nothing has been charged.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            You left checkout before completing payment. Your confirmed time is still
            held — you can return to the appointment and pay whenever you&apos;re ready.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {appointmentId ? (
              <Link
                href={`/dashboard/appointments/${appointmentId}`}
                className={buttonStyles({ size: "sm" })}
              >
                <ArrowLeft className="size-3.5" />
                Back to appointment
              </Link>
            ) : null}
            <Link
              href="/dashboard/appointments"
              className={buttonStyles({ variant: "outline", size: "sm" })}
            >
              <CreditCard className="size-3.5" />
              My appointments
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
          Payments are processed securely by Stripe. SalonBook never receives your card
          details.
        </p>
      </div>
    </DashboardShell>
  );
}

export function PaymentCancel() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-16">
          <Skeleton className="mx-auto h-64 max-w-2xl rounded-[22px]" />
        </div>
      }
    >
      <PaymentCancelContent />
    </Suspense>
  );
}
