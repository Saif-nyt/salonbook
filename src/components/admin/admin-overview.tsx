"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { useAdminAppointments, useAdminStats, useCustomers } from "@/lib/queries";
import { formatDate, formatMoney, formatTimeSlot } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AppointmentActions } from "@/components/dashboard/appointment-actions";
import { StatCard } from "@/components/ui/stat-card";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton, TableSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { AppointmentStatusBadge } from "@/components/ui/badge";

export function AdminOverview() {
  const stats = useAdminStats();
  const pending = useAdminAppointments({ status: "pending", limit: 5 });
  const customers = useCustomers({ page: 1 });
  const recentCustomers = (customers.data?.data ?? []).slice(0, 5);
  const pendingList = pending.data?.data ?? [];

  return (
    <DashboardShell
      role="admin"
      title="Salon overview"
      description="Live numbers from the appointment book, service menu and verified payments."
      actions={
        <Link href="/admin/services" className={buttonStyles({ size: "sm" })}>
          <Sparkles className="size-3.5" />
          Manage services
        </Link>
      }
    >
      {stats.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : stats.isError ? (
        <div className="surface rounded-lg p-8 text-center">
          <p className="font-display text-2xl text-charcoal">The dashboard didn&apos;t load.</p>
          <p className="mt-2 text-sm text-muted">Refresh the page to try again.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Registered customers"
            value={stats.data?.data.totalCustomers ?? 0}
            icon={Users}
            hint="Customer accounts"
          />
          <StatCard
            label="Active services"
            value={stats.data?.data.activeServices ?? 0}
            icon={Sparkles}
            hint="Visible on the public menu"
          />
          <StatCard
            label="Total requests"
            value={stats.data?.data.totalAppointments ?? 0}
            icon={CalendarDays}
          />
          <StatCard
            label="Pending requests"
            value={stats.data?.data.pending ?? 0}
            icon={CalendarDays}
            hint="Waiting for confirmation"
          />
          <StatCard
            label="Confirmed visits"
            value={stats.data?.data.confirmed ?? 0}
            icon={CheckCircle2}
          />
          <StatCard
            label="Successful payments"
            value={stats.data?.data.successfulPayments ?? 0}
            icon={CreditCard}
            hint={formatMoney(stats.data?.data.totalRevenue ?? 0)}
          />
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="surface overflow-hidden rounded-lg">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
            <div>
              <p className="eyebrow">Needs attention</p>
              <h2 className="mt-1 font-display text-2xl text-charcoal">Pending requests</h2>
            </div>
            <Link
              href="/admin/appointments"
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-deep-red hover:underline"
            >
              All appointments
            </Link>
          </div>

          {pending.isLoading ? (
            <div className="p-4">
              <TableSkeleton rows={3} />
            </div>
          ) : pending.isError ? (
            <p className="p-5 text-sm text-muted">Pending requests could not be loaded.</p>
          ) : pendingList.length === 0 ? (
            <div className="p-5">
              <p className="text-sm leading-relaxed text-muted">
                Nothing waiting. Every request has been reviewed — a rare and lovely
                moment.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {pendingList.map((appointment) => (
                <li key={appointment.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
                  <div className="size-11 shrink-0 overflow-hidden rounded-md bg-sand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={appointment.service.image}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-charcoal">
                      {appointment.service.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted">
                      {appointment.customer?.name ?? "Customer"} ·{" "}
                      {formatDate(appointment.appointmentDate)} ·{" "}
                      {formatTimeSlot(appointment.timeSlot)}
                    </p>
                  </div>
                  <AppointmentStatusBadge status={appointment.status} />
                  <AppointmentActions
                    appointment={appointment}
                    mode="admin"
                    showDetails={false}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-4">
          <div className="surface rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Revenue</p>
                <p className="mt-2 font-display text-4xl text-charcoal">
                  {formatMoney(stats.data?.data.totalRevenue ?? 0)}
                </p>
              </div>
              <span className="grid size-11 place-items-center rounded-full bg-sage-soft text-sage">
                <DollarSign className="size-5" />
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Verified Stripe payments only. Pending or abandoned checkouts are excluded.
            </p>
            <Link
              href="/admin/transactions"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-deep-red hover:underline"
            >
              View transactions
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="surface rounded-lg p-5">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Newest customers</p>
              <Link
                href="/admin/users"
                className="text-[11px] font-semibold uppercase tracking-[0.12em] text-deep-red hover:underline"
              >
                All customers
              </Link>
            </div>

            {customers.isLoading ? (
              <div className="mt-4 space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : recentCustomers.length === 0 ? (
              <p className="mt-4 text-sm text-muted">No customer accounts yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {recentCustomers.map((customer) => (
                  <li key={customer.id} className="flex items-center gap-3 py-3 first:pt-0">
                    <Avatar name={customer.name} image={customer.image} className="size-8" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-charcoal">{customer.name}</p>
                      <p className="truncate text-[11px] text-muted">{customer.email}</p>
                    </div>
                    <UserRound className="size-3.5 text-muted" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/admin/appointments"
          className="surface group rounded-lg p-5 transition-colors hover:border-deep-red/40"
        >
          <CalendarDays className="size-5 text-deep-red" />
          <p className="mt-3 font-display text-2xl text-charcoal">Review the book</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Confirm pending visits and manage cancellations.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-deep-red">
            Appointments
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
        <Link
          href="/admin/services"
          className="surface group rounded-lg p-5 transition-colors hover:border-deep-red/40"
        >
          <Sparkles className="size-5 text-deep-red" />
          <p className="mt-3 font-display text-2xl text-charcoal">Shape the menu</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Add treatments, adjust pricing and pause services.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-deep-red">
            Services
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
        <Link
          href="/admin/users"
          className="surface group rounded-lg p-5 transition-colors hover:border-deep-red/40"
        >
          <Users className="size-5 text-deep-red" />
          <p className="mt-3 font-display text-2xl text-charcoal">Know your guests</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Review customer details and manage account access.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-deep-red">
            Customers
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>

      <div className="mt-8">
        <EmptyState
          icon={CheckCircle2}
          title="Every figure here comes from MongoDB"
          description="Customer counts, service availability, appointment states and payment totals are calculated live — there are no placeholder numbers in this dashboard."
          className="py-10"
        />
      </div>
    </DashboardShell>
  );
}
