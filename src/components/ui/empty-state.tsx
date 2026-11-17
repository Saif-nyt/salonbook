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
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-line bg-cream/60 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-full bg-sand text-terracotta">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-5 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {action ? (
        <Link href={action.href} className={buttonStyles({ size: "sm", className: "mt-6" })}>
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
