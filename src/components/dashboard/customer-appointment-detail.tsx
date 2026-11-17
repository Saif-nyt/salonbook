"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";
import { useAppointment } from "@/lib/queries";
import { formatDate, formatDateTime, formatMoney, formatTimeSlot } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AppointmentActions } from "@/components/dashboard/appointment-actions";
import { AppointmentStatusBadge, PaymentStatusBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonStyles } from "@/components/ui/button";

export function CustomerAppointmentDetail() {
  const params = useParams<{ id: string }>();
  const id = typeof params.id === "string" ? params.id : undefined;
  const { data, isLoading, isError, error } = useAppointment(id);
  const appointment = data?.data;

  return (
    <DashboardShell
      role="customer"
      title={appointment ? appointment.service.name : "Appointment details"}
      description="The full record of your request, including the salon's status and payment state."
      actions={
        <Link
          href="/dashboard/appointments"
          className={buttonStyles({ variant: "outline", size: "sm" })}
        >
          <ArrowLeft className="size-3.5" />
          All appointments
        </Link>
      }
    >
      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
      ) : isError || !appointment ? (
        <div className="surface rounded-lg p-10 text-center">
          <p className="eyebrow">Not found</p>
          <h2 className="mt-2 font-display text-3xl text-ink">
            We can&apos;t open this appointment.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            {error instanceof Error
              ? error.message
              : "The appointment may have been removed, or it belongs to another account."}
          </p>
          <Link href="/dashboard/appointments" className={buttonStyles({ className: "mt-6" })}>
            Back to my appointments
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface overflow-hidden rounded-lg">
            <div className="relative aspect-[16/9] bg-sand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={appointment.service.image}
                alt={appointment.service.name}
                className="size-full object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full bg-cream/94 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft backdrop-blur-sm">
                  {appointment.service.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <AppointmentStatusBadge status={appointment.status} />
                <PaymentStatusBadge status={appointment.paymentStatus} />
              </div>

              <h2 className="mt-4 font-display text-3xl text-ink">
                {appointment.service.name}
              </h2>
              <p className="mt-1 text-xs text-muted">
                Requested {formatDateTime(appointment.createdAt)}
              </p>

              <dl className="mt-6 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">
                    Appointment date
                  </dt>
                  <dd className="mt-1.5 flex items-center gap-2 font-display text-xl text-ink">
                    <CalendarDays className="size-4 text-muted" />
                    {formatDate(appointment.appointmentDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">
                    Time
                  </dt>
                  <dd className="mt-1.5 flex items-center gap-2 font-display text-xl text-ink">
                    <Clock3 className="size-4 text-muted" />
                    {formatTimeSlot(appointment.timeSlot)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">
                    Service price
                  </dt>
                  <dd className="mt-1.5 font-display text-xl text-terracotta">
                    {formatMoney(appointment.servicePrice)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">
                    Duration
                  </dt>
                  <dd className="mt-1.5 flex items-center gap-2 font-display text-xl text-ink">
                    <Clock3 className="size-4 text-muted" />
                    {appointment.service.duration} minutes
                  </dd>
                </div>
              </dl>

              {appointment.message ? (
                <div className="mt-6 rounded-md border border-line bg-ivory/60 p-4">
                  <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    <MessageSquare className="size-3.5" />
                    Your note
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {appointment.message}
                  </p>
                </div>
              ) : null}

              <div className="mt-6">
                <AppointmentActions appointment={appointment} mode="customer" showDetails={false} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface rounded-lg p-6">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-5 space-y-5">
                <TimelineStep
                  done
                  title="Request received"
                  description="Your appointment is stored as pending and unpaid."
                />
                <TimelineStep
                  done={appointment.status === "confirmed" || appointment.paymentStatus === "paid"}
                  cancelled={appointment.status === "cancelled"}
                  title="Salon confirmation"
                  description={
                    appointment.status === "cancelled"
                      ? "This appointment was cancelled and the time slot released."
                      : appointment.status === "confirmed"
                        ? "The salon has confirmed your time. You can complete payment."
                        : "The salon will confirm your requested time shortly."
                  }
                />
                <TimelineStep
                  done={appointment.paymentStatus === "paid"}
                  title="Payment"
                  description={
                    appointment.paymentStatus === "paid"
                      ? "Payment confirmed by our payment provider."
                      : "Payment is only requested after confirmation."
                  }
                />
              </ol>
            </div>

            <div className="rounded-lg border border-line bg-sage-soft/70 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <ShieldCheck className="size-4 text-sage" />
                Payment is secure
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                Checkout is handled by Stripe. SalonBook never sees or stores your card
                details, and your appointment is marked paid only after Stripe confirms
                the payment.
              </p>
              <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.16em] text-muted">
                <span className="flex items-center gap-1">
                  <CreditCard className="size-3.5" /> Stripe checkout
                </span>
                <span className="flex items-center gap-1">
                  <Check className="size-3.5" /> Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function TimelineStep({
  done = false,
  cancelled = false,
  title,
  description,
}: {
  done?: boolean;
  cancelled?: boolean;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-3">
      <span
        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
          cancelled
            ? "bg-[#f4e0dc] text-[#8f3229]"
            : done
              ? "bg-sage text-cream"
              : "border border-line bg-cream text-muted"
        }`}
      >
        {cancelled ? <X className="size-3" /> : done ? <Check className="size-3" /> : null}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
      </div>
    </li>
  );
}
