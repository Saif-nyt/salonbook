import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div
        className="pointer-events-none absolute -right-40 top-0 size-[38rem] rounded-full bg-sand/50 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative grid items-center gap-14 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:py-24">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-terracotta/60" aria-hidden />
            <p className="eyebrow">Brooklyn · Established 2018</p>
          </div>

          <h1 className="mt-6 font-display text-[clamp(3.6rem,8vw,6.4rem)] leading-[0.92] tracking-[-0.025em] text-ink">
            Beauty,
            <br />
            <em className="font-normal italic text-terracotta">considered.</em>
          </h1>

          <p className="mt-7 max-w-md text-pretty text-[15px] leading-[1.8] text-muted">
            A neighbourhood salon for hair, skin, nails and body care. Thoughtful
            specialists, unhurried appointments, and a space that asks you to slow down.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/services" className={buttonStyles({ size: "lg" })}>
              Explore services
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/sign-up"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Book your first visit
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-line pt-7">
            <div>
              <p className="font-display text-3xl text-ink">4.9</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                <Star className="size-3 fill-terracotta text-terracotta" />
                320+ reviews
              </p>
            </div>
            <div className="h-9 w-px bg-line" aria-hidden />
            <div>
              <p className="font-display text-3xl text-ink">12</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                Specialists
              </p>
            </div>
            <div className="h-9 w-px bg-line" aria-hidden />
            <div>
              <p className="font-display text-3xl text-ink">8 yrs</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                In the neighbourhood
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:mr-0">
          <div
            className="absolute -left-3 -top-3 hidden h-full w-full rounded-t-[13rem] border border-terracotta/25 sm:block"
            aria-hidden
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[13rem] bg-sand">
            <Image
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
              alt="A light-filled salon interior with styling chairs and mirrors"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 34rem"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-4 max-w-[15rem] border border-line bg-cream/96 p-5 shadow-soft backdrop-blur-sm sm:left-8">
            <p className="eyebrow">This week</p>
            <p className="mt-2 font-display text-xl leading-snug text-ink">
              A few quiet hours, still open.
            </p>
            <Link
              href="/services"
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta"
            >
              Find your time
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <p className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.35em] text-muted lg:block">
            Marlow Lane · Brooklyn
          </p>
        </div>
      </div>
    </section>
  );
}
