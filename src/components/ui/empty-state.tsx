import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { buttonStyles } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[20px] border border-dashed border-warm-taupe/55 bg-soft-ivory/70 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-[14px] border border-warm-taupe/35 bg-warm-cream/80 text-charcoal">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-5 font-display text-3xl leading-tight text-charcoal">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {action ? (
        <Link href={action.href} className={buttonStyles({ size: "sm", className: "mt-6" })}>
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
