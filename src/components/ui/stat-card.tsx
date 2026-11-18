import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, hint, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "surface rounded-lg p-5 transition-shadow hover:shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {label}
        </p>
        <span className="grid size-9 place-items-center rounded-md bg-warm-cream text-charcoal ring-1 ring-warm-taupe/40">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-4 font-display text-4xl leading-none text-charcoal">{value}</p>
      {hint ? <p className="mt-2 text-xs leading-relaxed text-muted">{hint}</p> : null}
    </div>
  );
}
