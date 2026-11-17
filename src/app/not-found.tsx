import Link from "next/link";
import { ArrowLeft, Scissors } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <div className="container-page flex h-20 items-center">
        <Logo />
      </div>

      <main className="container-page flex flex-1 items-center py-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="eyebrow">404 — Page not found</p>
            <h1 className="mt-4 font-display text-6xl leading-[0.95] text-ink sm:text-7xl">
              This page has
              <br />
              <em className="font-normal italic text-terracotta">left the chair.</em>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              The page you were looking for isn&apos;t here. It may have moved, or the
              link may be out of date. The salon is still open.
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

          <div className="relative hidden aspect-square max-w-sm justify-self-end rounded-t-[12rem] border border-line bg-cream lg:block">
            <div className="absolute inset-6 rounded-t-[10rem] border border-dashed border-line" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-sand text-terracotta">
                  <Scissors className="size-6" />
                </span>
                <p className="mt-4 font-display text-6xl text-ink">404</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted">
                  Nothing booked here
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="border-t border-line py-6">
        <p className="container-page text-[11px] uppercase tracking-[0.18em] text-muted">
          SalonBook · 18 Marlow Lane, Brooklyn
        </p>
      </div>
    </div>
  );
}
