import { cn } from "@/lib/utils";
import type { AppointmentStatus, PaymentStatus, ServiceStatus, TransactionStatus } from "@/lib/types";

type Tone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "muted"
  | "accent";

const tones: Record<Tone, string> = {
  neutral: "bg-sand text-ink-soft",
  success: "bg-sage-soft text-[#45523d]",
  warning: "bg-[#f3e6cf] text-[#7b5a1f]",
  danger: "bg-[#f4e0dc] text-[#8f3229]",
  muted: "bg-[#eeeae4] text-muted",
  accent: "bg-[#efe0d5] text-terracotta-dark",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const appointmentTones: Record<AppointmentStatus, Tone> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
};

const paymentTones: Record<PaymentStatus, Tone> = {
  unpaid: "muted",
  paid: "success",
};

const transactionTones: Record<TransactionStatus, Tone> = {
  pending: "warning",
  paid: "success",
  failed: "danger",
  cancelled: "muted",
};

export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  return <Badge tone={appointmentTones[status]}>{status}</Badge>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge tone={paymentTones[status]}>{status}</Badge>;
}

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  return <Badge tone={transactionTones[status]}>{status}</Badge>;
}

export function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
  return (
    <Badge tone={status === "active" ? "success" : "muted"}>{status}</Badge>
  );
}
