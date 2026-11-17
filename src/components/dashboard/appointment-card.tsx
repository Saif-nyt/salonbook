import Link from "next/link";
import { ArrowUpRight, CalendarDays, CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { Appointment } from "@/lib/types";
import { formatDate, formatMoney, formatTimeSlot } from "@/lib/utils";
import { AppointmentStatusBadge, PaymentStatusBadge } from "@/components/ui/badge";
import { AppointmentActions } from "./appointment-actions";

export function AppointmentCard({
  appointment,
  mode = "customer",
}: {
  appointment: Appointment;
  mode?: "customer" | "admin";
}) {
  return (
    <article className="surface overflow-hidden rounded-lg">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <Link
          href={
            mode === "admin"
              ? "/admin/appointments"
              : `/dashboard/appointments/${appointment.id}`
          }
          className="relative block h-24 w-full shrink-0 overflow-hidden rounded-md bg-sand sm:size-24"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={appointment.service.image}
            alt={appointment.service.name}
            className="size-full object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              {appointment.service.category}
            </p>
            <span className="h-1 w-1 rounded-full bg-line" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
              Requested {formatDate(appointment.createdAt)}
            </p>
          </div>
          <h3 className="mt-1.5 truncate font-display text-2xl text-ink">
            {appointment.service.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink-soft">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-muted" />
              {formatDate(appointment.appointmentDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-3.5 text-muted" />
              {formatTimeSlot(appointment.timeSlot)} · {appointment.service.duration} min
            </span>
            <span className="font-semibold text-ink">
              {formatMoney(appointment.servicePrice)}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <AppointmentStatusBadge status={appointment.status} />
            <PaymentStatusBadge status={appointment.paymentStatus} />
            {mode === "admin" && appointment.customer ? (
              <span className="text-xs text-muted">{appointment.customer.name}</span>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <AppointmentActions
            appointment={appointment}
            mode={mode}
            showDetails={false}
          />
          <Link
            href={
              mode === "admin"
                ? "/admin/appointments"
                : `/dashboard/appointments/${appointment.id}`
            }
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-terracotta hover:underline"
          >
            View details
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export const overviewIcons = {
  total: CalendarDays,
  pending: Clock3,
  confirmed: CheckCircle2,
  cancelled: XCircle,
};
