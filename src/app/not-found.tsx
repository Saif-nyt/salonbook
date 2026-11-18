import Link from "next/link";
import { ArrowLeft, Scissors } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-warm-cream">
      <div className="container-page flex h-20 items-center">
        <Logo />
      </div>

      <main className="container-page relative flex flex-1 items-center py-16">
        <div
          className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-deep-red/10 blur-3xl"
          aria-hidden
        />
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="eyebrow">404 — Page not found</p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,4.8rem)] leading-[0.94] text-charcoal">
              This page isn&apos;t
              <br />
              <em className="font-normal italic text-deep-red">on the menu.</em>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
              The page you were looking for may have moved or no longer exists. You can return
              home or browse our services.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className={buttonStyles()}>
                <ArrowLeft className="size-4" />
                Back home
              </Link>
              <Link href="/services" className={buttonStyles({ variant: "outline" })}>
                Browse services
              </Link>
            </div>
          </div>

          <div className="relative hidden aspect-square max-w-sm justify-self-end rounded-[24px] border border-warm-taupe/40 bg-soft-ivory p-8 shadow-elevated lg:block">
            <div className="absolute inset-6 rounded-[18px] border border-dashed border-warm-taupe/45" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-[14px] bg-charcoal text-white shadow-[0_16px_36px_-24px_rgba(28,28,28,0.7)]">
                  <Scissors className="size-6" />
                </span>
                <p className="mt-4 font-display text-6xl text-charcoal">404</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted">
                  Page not found
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="border-t border-warm-taupe/35 py-6">
        <p className="container-page text-[11px] uppercase tracking-[0.18em] text-muted">
          SalonBook · 18 Marlow Lane, Brooklyn
        </p>
      </div>
    </div>
  );
}
