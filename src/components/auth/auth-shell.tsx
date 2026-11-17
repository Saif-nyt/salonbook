import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <Image
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=85"
          alt="A quiet corner of the SalonBook studio"
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Logo light />
          <div className="max-w-sm">
            <Quote className="size-7 text-cream/35" />
            <p className="mt-5 font-display text-3xl leading-[1.25] text-cream xl:text-4xl">
              “The appointment ends, but the feeling of being looked after stays with
              you.”
            </p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-cream/50">
              The SalonBook promise
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-cream/40">
            18 Marlow Lane · Brooklyn
          </p>
        </div>
      </aside>

      <main className="flex flex-col bg-ivory">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <div className="lg:hidden">
            <Logo />
          </div>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-terracotta"
          >
            <ArrowLeft className="size-3.5" />
            Back to the salon
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-16 pt-6 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <p className="eyebrow">SalonBook account</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">{subtitle}</p>

            <div className="mt-8">{children}</div>
            <div className="mt-7 text-sm text-muted">{footer}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
