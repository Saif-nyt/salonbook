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
          "grid size-9 place-items-center rounded-full border font-display text-lg leading-none",
          light
            ? "border-white/30 text-white"
            : "border-charcoal/20 text-charcoal",
        )}
        aria-hidden
      >
        SB
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.4rem] tracking-tight",
            light ? "text-white" : "text-charcoal",
          )}
        >
          SalonBook
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] font-semibold uppercase tracking-[0.24em]",
            light ? "text-white/55" : "text-muted",
          )}
        >
          Beauty, considered
        </span>
      </span>
    </Link>
  );
}
