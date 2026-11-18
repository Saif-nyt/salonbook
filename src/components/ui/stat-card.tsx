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
        "surface rounded-[18px] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {label}
        </p>
        <span className="grid size-10 place-items-center rounded-[12px] border border-warm-taupe/35 bg-warm-cream/80 text-charcoal">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-4 font-display text-[2.1rem] leading-none text-charcoal">{value}</p>
      {hint ? <p className="mt-2 text-xs leading-relaxed text-muted">{hint}</p> : null}
    </div>
  );
}
