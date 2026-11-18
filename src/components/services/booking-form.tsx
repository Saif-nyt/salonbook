"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowRight, CalendarDays, Clock, LogIn, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useAvailability } from "@/lib/queries";
import { apiFetch, ApiError } from "@/lib/api";
import type { Appointment, Service } from "@/lib/types";
import {
  formatTimeSlot,
  maxBookingDateValue,
  todayDateValue,
  formatMoney,
} from "@/lib/utils";
import { Field, Select, Textarea } from "@/components/ui/field";
import { Button, buttonStyles } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const bookingSchema = z.object({
  appointmentDate: z.string().min(1, "Choose a date"),
  timeSlot: z.string().min(1, "Choose a time"),
  message: z.string().max(500, "Please keep your note under 500 characters").optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;

export function BookingForm({ service }: { service: Service }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      appointmentDate: "",
      timeSlot: "",
      message: "",
    },
  });

  const selectedDate = form.watch("appointmentDate");
  const selectedSlot = form.watch("timeSlot");
  const availability = useAvailability(selectedDate, Boolean(selectedDate && user));

  const slots = useMemo(() => availability.data?.data ?? [], [availability.data]);

  useEffect(() => {
    form.setValue("timeSlot", "");
  }, [selectedDate, form]);

  useEffect(() => {
    if (!selectedSlot || slots.length === 0) return;
    const match = slots.find((slot) => slot.slot === selectedSlot);
    if (match && !match.available) {
      form.setValue("timeSlot", "");
    }
  }, [slots, selectedSlot, form]);

  const mutation = useMutation({
    mutationFn: (values: BookingValues) =>
      apiFetch<Appointment>("/api/appointments", {
        method: "POST",
        body: { serviceId: service.id, ...values },
      }),
    onSuccess: (response) => {
      toast.success("Appointment requested", {
        description: "We'll confirm your time shortly. You can follow it in your dashboard.",
      });
      void queryClient.invalidateQueries({ queryKey: ["my-appointments"] });
      void queryClient.invalidateQueries({ queryKey: ["dashboard-customer"] });
      form.reset();
      router.push(`/dashboard/appointments/${response.data.id}`);
    },
    onError: (error) => {
      const message =
        error instanceof ApiError ? error.message : "Your request could not be submitted";
      form.setError("root", { message });
      toast.error(message);
    },
  });

  const minDate = useMemo(todayDateValue, []);
  const maxDate = useMemo(() => maxBookingDateValue(), []);
  const unavailable = service.status !== "active";

  if (isLoading) {
    return (
      <div className="surface space-y-4 rounded-lg p-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    );
  }

  if (!user) {
    const redirect = encodeURIComponent(pathname);
    return (
      <div className="surface rounded-lg p-6">
        <p className="eyebrow">Book this service</p>
        <h3 className="mt-2 font-display text-3xl text-charcoal">Sign in to continue.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Sign in to request an appointment, manage your bookings and keep everything in
          one place.
        </p>
        <div className="mt-6 space-y-3">
          <Link
            href={`/sign-in?redirect=${redirect}`}
            className={buttonStyles({ className: "w-full" })}
          >
            <LogIn className="size-4" />
            Sign in
          </Link>
          <Link
            href={`/sign-up?redirect=${redirect}`}
            className={buttonStyles({ variant: "outline", className: "w-full" })}
          >
            Create an account
          </Link>
        </div>
        <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-charcoal" />
          No payment is taken when you request an appointment.
        </p>
      </div>
    );
  }

  if (user.role === "admin") {
    return (
      <div className="surface rounded-lg p-6">
        <p className="eyebrow">Booking</p>
        <h3 className="mt-2 font-display text-3xl text-charcoal">Administrator account</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Administrator accounts can&apos;t request customer appointments. Use the admin
          dashboard to manage services and bookings.
        </p>
        <Link
          href="/admin"
          className={buttonStyles({ variant: "secondary", className: "mt-6 w-full" })}
        >
          Go to admin dashboard
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  if (unavailable) {
    return (
      <div className="surface rounded-lg p-6">
        <p className="eyebrow">Currently unavailable</p>
        <h3 className="mt-2 font-display text-3xl text-charcoal">This service is paused.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This treatment isn&apos;t accepting new appointments right now. Explore other
          services in the meantime.
        </p>
        <Link
          href="/services"
          className={buttonStyles({ variant: "outline", className: "mt-6 w-full" })}
        >
          Browse services
        </Link>
      </div>
    );
  }

  return (
    <div className="surface rounded-lg p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Request an appointment</p>
          <h3 className="mt-2 font-display text-4xl text-charcoal">
            {formatMoney(service.price)}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {service.duration} minutes · pay after confirmation
          </p>
        </div>
        <span className="grid size-11 place-items-center rounded-md bg-warm-cream text-charcoal ring-1 ring-warm-taupe/40">
          <CalendarDays className="size-5" />
        </span>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        noValidate
      >
        <Field
          label="Preferred date"
          htmlFor="appointmentDate"
          required
          error={form.formState.errors.appointmentDate?.message}
        >
          <input
            id="appointmentDate"
            type="date"
            min={minDate}
            max={maxDate}
            className="h-11 w-full rounded-md border border-warm-taupe/70 bg-soft-ivory px-3.5 text-sm text-charcoal focus:border-deep-red/60 focus:outline-none focus:ring-2 focus:ring-deep-red/15"
            {...form.register("appointmentDate")}
          />
        </Field>

        <Field
          label="Available time"
          htmlFor="timeSlot"
          required
          hint={
            !selectedDate
              ? "Choose a date to see available times"
              : availability.isLoading
                ? "Checking availability…"
                : "Salon hours · 9:00 am to 6:00 pm"
          }
          error={form.formState.errors.timeSlot?.message}
        >
          <Select
            id="timeSlot"
            disabled={!selectedDate || availability.isLoading}
            invalid={Boolean(form.formState.errors.timeSlot)}
            {...form.register("timeSlot")}
          >
            <option value="">Select a time</option>
            {slots.map((slot) => (
              <option key={slot.slot} value={slot.slot} disabled={!slot.available}>
                {formatTimeSlot(slot.slot)}
                {slot.available ? "" : " — unavailable"}
              </option>
            ))}
          </Select>
        </Field>

        {availability.isError ? (
          <p className="rounded-md border border-[#e7c2be] bg-[#f6e3e1] px-3 py-2 text-xs text-[#8f241d]">
            Availability could not be loaded. Please try another date.
          </p>
        ) : null}

        <Field
          label="Note for your specialist"
          htmlFor="message"
          hint="Optional — preferences, allergies or anything we should know."
          error={form.formState.errors.message?.message}
        >
          <Textarea
            id="message"
            placeholder="Share any details that will help us prepare…"
            {...form.register("message")}
          />
        </Field>

        {form.formState.errors.root?.message ? (
          <p
            className="rounded-md border border-[#e7c2be] bg-[#f6e3e1] px-3 py-2 text-xs text-[#8f241d]"
            role="alert"
          >
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" isLoading={mutation.isPending}>
          Request appointment
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <div className="mt-5 space-y-2 border-t border-warm-taupe/40 pt-4 text-xs leading-relaxed text-muted">
        <p className="flex items-start gap-2">
          <Clock className="mt-0.5 size-3.5 shrink-0 text-charcoal" />
          Your request is pending until the salon confirms it.
        </p>
        <p className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-charcoal" />
          You&apos;ll be asked to pay only after confirmation.
        </p>
      </div>
    </div>
  );
}
