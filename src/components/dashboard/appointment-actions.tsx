"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Ban, Check, CreditCard } from "lucide-react";
import { apiFetch, ApiError } from "@/lib/api";
import type { Appointment, PaymentSession } from "@/lib/types";
import { Button, buttonStyles } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/modal";

type Mode = "customer" | "admin";

export function AppointmentActions({
  appointment,
  mode,
  showDetails = true,
}: {
  appointment: Appointment;
  mode: Mode;
  showDetails?: boolean;
}) {
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["my-appointments"] });
    void queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
    void queryClient.invalidateQueries({ queryKey: ["appointment", appointment.id] });
    void queryClient.invalidateQueries({ queryKey: ["dashboard-customer"] });
    void queryClient.invalidateQueries({ queryKey: ["dashboard-admin"] });
  };

  const cancelAppointment = useMutation({
    mutationFn: () =>
      apiFetch<Appointment>(`/api/appointments/${appointment.id}/cancel`, {
        method: "PATCH",
      }),
    onSuccess: () => {
      toast.success("Appointment cancelled", {
        description: "The time slot has been released.",
      });
      setConfirmOpen(false);
      refresh();
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : "The appointment was not cancelled.",
      );
    },
  });

  const confirmAppointment = useMutation({
    mutationFn: () =>
      apiFetch<Appointment>(`/api/appointments/${appointment.id}/confirm`, {
        method: "PATCH",
      }),
    onSuccess: () => {
      toast.success("Appointment confirmed", {
        description: "The customer can now pay for this visit.",
      });
      refresh();
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError ? error.message : "The appointment was not confirmed.",
      );
    },
  });

  const pay = useMutation({
    mutationFn: () =>
      apiFetch<PaymentSession>(`/api/payments/checkout/${appointment.id}`, {
        method: "POST",
      }),
    onSuccess: (response) => {
      window.location.assign(response.data.url);
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Checkout could not be started. Please try again.",
        { description: "No payment has been taken." },
      );
    },
  });

  const canCancel =
    appointment.status !== "cancelled" &&
    (mode === "admin" ? true : appointment.status === "pending");
  const canConfirm = mode === "admin" && appointment.status === "pending";
  const canPay =
    mode === "customer" &&
    appointment.status === "confirmed" &&
    appointment.paymentStatus === "unpaid";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showDetails ? (
        <Link
          href={
            mode === "admin"
              ? `/admin/appointments?focus=${appointment.id}`
              : `/dashboard/appointments/${appointment.id}`
          }
          className={buttonStyles({ variant: "outline", size: "sm" })}
        >
          Details
          <ArrowUpRight className="size-3.5" />
        </Link>
      ) : null}

      {canConfirm ? (
        <Button
          size="sm"
          onClick={() => confirmAppointment.mutate()}
          isLoading={confirmAppointment.isPending}
        >
          <Check className="size-3.5" />
          Confirm
        </Button>
      ) : null}

      {canPay ? (
        <Button
          size="sm"
          onClick={() => pay.mutate()}
          isLoading={pay.isPending}
        >
          <CreditCard className="size-3.5" />
          Pay now
        </Button>
      ) : null}

      {canCancel ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmOpen(true)}
          className="text-[#8f241d]"
        >
          <Ban className="size-3.5" />
          Cancel
        </Button>
      ) : null}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => cancelAppointment.mutate()}
        isLoading={cancelAppointment.isPending}
        title="Cancel this appointment?"
        description="The time slot will be released for other guests. This cannot be undone."
        confirmLabel="Yes, cancel appointment"
      />
    </div>
  );
}
