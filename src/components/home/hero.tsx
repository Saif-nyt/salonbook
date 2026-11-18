import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { BrandSeal } from "@/components/ui/brand-seal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-cream">
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-soft-lavender/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[10%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-deep-red/10 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative pb-10 pt-10 sm:pb-14 lg:pb-20 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-6">
          <div className="relative z-10 lg:col-span-7 lg:pt-8 xl:pt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-gray">
              SalonBook Edit <span className="mx-2 text-warm-taupe">/</span> No. 01
            </p>

            <h1 className="mt-4 font-display text-[clamp(3.2rem,9vw,7.2rem)] leading-[0.86] tracking-[-0.04em] text-charcoal">
              <span className="block">Beauty,</span>
              <span className="block pl-[0.08em] italic text-deep-red sm:pl-[0.22em]">
                considered.
              </span>
              <span className="mt-1 block text-[clamp(2.4rem,6.2vw,5rem)] leading-[0.92] tracking-[-0.03em] text-charcoal/90 sm:pl-[0.5em]">
                Booked with <span className="italic">ease.</span>
              </span>
            </h1>

            <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end lg:max-w-2xl">
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted sm:text-[17px] sm:leading-relaxed">
                A modern salon experience shaped around craft, calm, and clarity — from
                discovering treatments to confirming your next appointment.
              </p>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <Link href="/services" className={buttonStyles({ size: "lg", className: "group" })}>
                  Explore salon services
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="text-[13px] font-semibold uppercase tracking-[0.16em] text-charcoal underline decoration-warm-taupe/70 decoration-1 underline-offset-4 transition-colors hover:text-deep-red hover:decoration-deep-red/40"
                >
                  Reserve an appointment
                </Link>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-warm-taupe/40 pt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-gray">
              <span>Hair</span>
              <span className="size-1 rounded-full bg-warm-taupe" aria-hidden />
              <span>Nails</span>
              <span className="size-1 rounded-full bg-warm-taupe" aria-hidden />
              <span>Skin</span>
              <span className="size-1 rounded-full bg-warm-taupe" aria-hidden />
              <span>Massage</span>
              <span className="size-1 rounded-full bg-warm-taupe" aria-hidden />
              <span>Makeup</span>
              <span className="size-1 rounded-full bg-warm-taupe" aria-hidden />
              <span>Barber</span>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:pt-2">
            <div className="relative ml-auto w-full max-w-[34rem] lg:max-w-none">
              <div className="relative overflow-hidden rounded-[30px] bg-sand shadow-elevated ring-1 ring-warm-taupe/20">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85"
                    alt="A stylist crafting a polished look in a modern salon"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
              </div>

              <div className="absolute -left-3 bottom-8 hidden w-[11rem] overflow-hidden rounded-[18px] bg-sand shadow-card ring-4 ring-warm-cream sm:block lg:-left-10 lg:bottom-12 lg:w-[12.5rem]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=85"
                    alt="Editorial beauty portrait with natural, polished makeup"
                    fill
                    sizes="(max-width: 1024px) 30vw, 12rem"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute -right-2 -top-4 z-20 sm:-right-4 lg:-right-6 lg:-top-6">
                <BrandSeal
                  phrase="BEAUTY, YOUR WAY"
                  className="size-24 text-charcoal/75 sm:size-28 lg:size-32"
                />
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-4 sm:absolute sm:-bottom-6 sm:right-4 sm:mt-0 sm:w-[15rem] lg:-bottom-8 lg:right-0 lg:w-[16rem]">
                <div className="rounded-[18px] border border-warm-taupe/35 bg-soft-ivory/95 p-4 shadow-card backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-burgundy">
                    At a glance
                  </p>
                  <p className="mt-2 font-display text-[1.35rem] leading-[1.05] text-charcoal">
                    Clear pricing. <span className="italic">Calm booking.</span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    Request online, track status, and pay securely after confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-6 hidden select-none font-display text-[clamp(4rem,10vw,8rem)] leading-none tracking-[-0.05em] text-charcoal/[0.04] lg:block" aria-hidden>
          SalonBook
        </div>
      </div>
    </section>
  );
}