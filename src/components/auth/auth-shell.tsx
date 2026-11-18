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
    <div className="grid min-h-screen bg-warm-cream lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden overflow-hidden bg-charcoal lg:block">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85"
          alt="A refined, light-filled salon interior"
          fill
          priority
          sizes="55vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/20" />
        <div
          className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-deep-red/25 blur-3xl"
          aria-hidden
        />
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Logo light />
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
              SalonBook
            </p>
            <p className="mt-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.08] text-white">
              Premium care, booked with <span className="italic">confidence</span>.
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/72">
              Manage appointments, discover treatments and enjoy a seamless salon experience
              from first visit to rebooking.
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
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

        <div className="flex flex-1 items-center justify-center px-5 pb-16 pt-4 sm:px-8 lg:px-12">
          <div className="w-full max-w-md rounded-[22px] border border-warm-taupe/40 bg-soft-ivory p-6 shadow-elevated sm:p-8">
            <p className="eyebrow">SalonBook account</p>
            <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,2.8rem)] leading-[1.05] text-charcoal">
              {title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{subtitle}</p>

            <div className="mt-8">{children}</div>
            <div className="mt-7 text-sm text-muted">{footer}</div>
          </div>
        </div>
      </main>
    </div>
  );
}