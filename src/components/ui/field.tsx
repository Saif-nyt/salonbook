import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1 text-xs font-semibold tracking-wide text-charcoal"
      >
        {label}
        {required ? <span className="text-deep-red">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-[#9b241d]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs leading-relaxed text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-warm-taupe/70 bg-soft-ivory px-3.5 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:border-deep-red/60 focus:outline-none focus:ring-2 focus:ring-deep-red/15 disabled:cursor-not-allowed disabled:opacity-60",
        invalid && "border-[#b3261e]/60 focus:border-[#b3261e] focus:ring-[#b3261e]/15",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-28 w-full resize-y rounded-md border border-warm-taupe/70 bg-soft-ivory px-3.5 py-3 text-sm leading-relaxed text-charcoal placeholder:text-muted/70 transition-colors focus:border-deep-red/60 focus:outline-none focus:ring-2 focus:ring-deep-red/15 disabled:cursor-not-allowed disabled:opacity-60",
          invalid && "border-[#b3261e]/60 focus:border-[#b3261e] focus:ring-[#b3261e]/15",
          className,
        )}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  },
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-md border border-warm-taupe/70 bg-soft-ivory pl-3.5 pr-9 text-sm text-charcoal transition-colors focus:border-deep-red/60 focus:outline-none focus:ring-2 focus:ring-deep-red/15 disabled:cursor-not-allowed disabled:opacity-60",
          invalid && "border-[#b3261e]/60 focus:border-[#b3261e] focus:ring-[#b3261e]/15",
          className,
        )}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="m5 7.5 5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});
