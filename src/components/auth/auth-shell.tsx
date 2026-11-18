import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <div className="grid min-h-screen bg-warm-cream lg:grid-cols-[1fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-charcoal lg:block">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85"
          alt="A refined, light-filled salon interior"
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Logo light />
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              SalonBook
            </p>
            <p className="mt-4 font-display text-4xl leading-[1.15] text-white xl:text-5xl">
              Premium care, booked with confidence.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Manage appointments, discover treatments and enjoy a seamless salon
              experience from first visit to rebooking.
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            18 Marlow Lane · Brooklyn
          </p>
        </div>
      </aside>

      <main className="flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <div className="lg:hidden">
            <Logo />
          </div>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-16 pt-6 sm:px-8 lg:px-12">
          <div className="w-full max-w-md rounded-lg border border-warm-taupe/50 bg-soft-ivory p-6 shadow-card sm:p-8">
            <p className="eyebrow">SalonBook account</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
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