import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
  light = false,
}: {
  href?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="SalonBook home"
    >
      <span
        className={cn(
          "grid size-9 place-items-center rounded-full border font-display text-xl leading-none",
          light
            ? "border-cream/40 text-cream"
            : "border-terracotta/40 text-terracotta",
        )}
        aria-hidden
      >
        S
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.45rem] tracking-tight",
            light ? "text-cream" : "text-ink",
          )}
        >
          SalonBook
        </span>
        <span
          className={cn(
            "mt-1 text-[8px] font-semibold uppercase tracking-[0.28em]",
            light ? "text-cream/60" : "text-muted",
          )}
        >
          Brooklyn
        </span>
      </span>
    </Link>
  );
}
