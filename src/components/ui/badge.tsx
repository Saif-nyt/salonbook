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
  neutral: "bg-warm-cream text-charcoal border border-warm-taupe/35",
  success: "bg-[#e9f3ed] text-success border border-[#cfe3d8]",
  warning: "bg-[#f8efe2] text-warning border border-[#ead8b8]",
  danger: "bg-[#f7e6e4] text-[#8f241d] border border-[#e8c9c4]",
  muted: "bg-[#ece7de] text-muted-gray border border-warm-taupe/35",
  accent: "bg-[#f7e8e6] text-deep-red border border-deep-red/20",
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
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize tracking-[0.02em]",
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
