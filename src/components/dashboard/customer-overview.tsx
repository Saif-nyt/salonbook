"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCustomerStats, useMyAppointments } from "@/lib/queries";
import { formatDate, formatMoney, formatTimeSlot } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { AppointmentActions } from "@/components/dashboard/appointment-actions";
import { StatCard } from "@/components/ui/stat-card";
import { Skeleton, TableSkeleton } from "@/components/ui/skeleton";
import { Badge, PaymentStatusBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";

export function CustomerOverview() {
  const { user } = useAuth();
  const stats = useCustomerStats();
  const appointments = useMyAppointments({ limit: 6 });

  const list = appointments.data?.data ?? [];
  const nextVisit = [...list]
    .filter((appointment) => appointment.status !== "cancelled")
    .sort(
      (a, b) =>
        new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime(),
    )[0];
  const recent = list.slice(0, 3);

  return (
    <DashboardShell
      role="customer"
      title={`Good to see you${user?.name ? `, ${user.name.split(" ")[0]}` : ""}.`}
      description="A quiet overview of your appointments, payments and next visit to the salon."
      actions={
        <Link href="/services" className={buttonStyles({ size: "sm" })}>
          Book a treatment
          <ArrowRight className="size-3.5" />
        </Link>
      }
    >
      {stats.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : stats.isError ? (
        <div className="surface rounded-lg p-8 text-center">
          <p className="font-display text-2xl text-ink">We couldn&apos;t load your summary.</p>
          <p className="mt-2 text-sm text-muted">Please refresh the page and try again.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total requests"
            value={stats.data?.data.totalAppointments ?? 0}
            icon={CalendarDays}
          />
          <StatCard
            label="Pending"
            value={stats.data?.data.pending ?? 0}
            icon={Clock3}
            hint="Awaiting salon confirmation"
          />
          <StatCard
            label="Confirmed"
            value={stats.data?.data.confirmed ?? 0}
            icon={CheckCircle2}
            hint="Ready for payment or visit"
          />
          <StatCard
            label="Cancelled"
            value={stats.data?.data.cancelled ?? 0}
            icon={XCircle}
          />
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface overflow-hidden rounded-lg">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="eyebrow">Your next visit</p>
              <h2 className="mt-1 font-display text-2xl text-ink">
                {nextVisit ? nextVisit.service.name : "Nothing on the calendar yet"}
              </h2>
            </div>
            <Sparkles className="size-5 text-terracotta/70" />
          </div>

          {appointments.isLoading ? (
            <div className="space-y-3 p-5">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-10 w-32" />
            </div>
          ) : nextVisit ? (
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{nextVisit.service.category}</Badge>
                <PaymentStatusBadge status={nextVisit.paymentStatus} />
                <Badge tone="neutral">{nextVisit.status}</Badge>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Date</p>
                  <p className="mt-1 font-display text-xl text-ink">
                    {formatDate(nextVisit.appointmentDate)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Time</p>
                  <p className="mt-1 font-display text-xl text-ink">
                    {formatTimeSlot(nextVisit.timeSlot)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Price</p>
                  <p className="mt-1 font-display text-xl text-terracotta">
                    {formatMoney(nextVisit.servicePrice)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Duration</p>
                  <p className="mt-1 font-display text-xl text-ink">
                    {nextVisit.service.duration} min
                  </p>
                </div>
              </div>

              {nextVisit.status === "confirmed" && nextVisit.paymentStatus === "unpaid" ? (
                <div className="mt-5 rounded-md bg-sand/60 px-4 py-3 text-xs leading-relaxed text-ink-soft">
                  This appointment is confirmed. Complete payment before your visit to
                  hold the time.
                </div>
              ) : nextVisit.status === "pending" ? (
                <div className="mt-5 rounded-md bg-sand/60 px-4 py-3 text-xs leading-relaxed text-ink-soft">
                  The salon is reviewing your request. We&apos;ll confirm it shortly.
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/dashboard/appointments/${nextVisit.id}`}
                  className={buttonStyles({ size: "sm" })}
                >
                  View appointment
                  <ArrowRight className="size-3.5" />
                </Link>
                <AppointmentActions
                  appointment={nextVisit}
                  mode="customer"
                  showDetails={false}
                />
              </div>
            </div>
          ) : (
            <div className="p-5">
              <p className="text-sm leading-relaxed text-muted">
                There&apos;s no upcoming appointment. Browse the menu whenever you&apos;re
                ready — the good slots go quietly.
              </p>
              <Link href="/services" className={buttonStyles({ size: "sm", className: "mt-5" })}>
                Explore treatments
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="surface rounded-lg p-5">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Recent requests</p>
              <Link
                href="/dashboard/appointments"
                className="text-[11px] font-semibold uppercase tracking-[0.12em] text-terracotta hover:underline"
              >
                See all
              </Link>
            </div>

            {appointments.isLoading ? (
              <div className="mt-4 space-y-3">
                <TableSkeleton rows={2} />
              </div>
            ) : recent.length === 0 ? (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Your appointment requests will appear here once you book.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {recent.map((appointment) => (
                  <li key={appointment.id} className="flex items-center gap-3 py-3 first:pt-0">
                    <div className="size-11 shrink-0 overflow-hidden rounded-md bg-sand">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={appointment.service.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/dashboard/appointments/${appointment.id}`}
                        className="block truncate text-sm font-semibold text-ink hover:text-terracotta"
                      >
                        {appointment.service.name}
                      </Link>
                      <p className="text-[11px] text-muted">
                        {formatDate(appointment.appointmentDate)} ·{" "}
                        {formatTimeSlot(appointment.timeSlot)}
                      </p>
                    </div>
                    <PaymentStatusBadge status={appointment.paymentStatus} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="surface rounded-lg p-5">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Payments</p>
              <CreditCard className="size-4 text-terracotta/70" />
            </div>
            <p className="mt-3 font-display text-3xl text-ink">
              {formatMoney(stats.data?.data.totalPaid ?? 0)}
            </p>
            <p className="mt-1 text-xs text-muted">
              {stats.data?.data.payments ?? 0} completed payment
              {(stats.data?.data.payments ?? 0) === 1 ? "" : "s"}
            </p>
            <Link
              href="/dashboard/payments"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-terracotta hover:underline"
            >
              Payment history
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-ink">Recent appointments</h2>
          <Link
            href="/dashboard/appointments"
            className="text-xs font-medium text-terracotta hover:underline"
          >
            All appointments
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {appointments.isLoading ? (
            <TableSkeleton rows={3} />
          ) : recent.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="Your first appointment is waiting"
              description="Browse the treatment menu and request a time with one of our specialists."
              action={{ label: "Browse services", href: "/services" }}
            />
          ) : (
            recent.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
