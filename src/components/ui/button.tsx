import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "subtle" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-deep-red text-white shadow-[0_18px_40px_-22px_rgba(179,38,30,0.7)] hover:bg-deep-red-dark hover:-translate-y-px",
  secondary:
    "bg-charcoal text-white shadow-[0_16px_36px_-26px_rgba(28,28,28,0.7)] hover:bg-[#151515]",
  outline:
    "border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal/45 hover:bg-charcoal/[0.03]",
  ghost:
    "bg-transparent text-charcoal hover:bg-charcoal/[0.05]",
  subtle:
    "border border-line/70 bg-soft-ivory text-charcoal hover:bg-warm-cream",
  danger:
    "bg-error text-white hover:bg-[#96221b] shadow-[0_16px_36px_-24px_rgba(179,38,30,0.55)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
  icon: "size-11",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold tracking-[0.01em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-red/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}
