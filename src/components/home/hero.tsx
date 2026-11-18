import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { BrandSeal } from "@/components/ui/brand-seal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-cream">
      <div
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-deep-red/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-10%] top-[-6%] h-96 w-96 rounded-full bg-warm-taupe/25 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative grid gap-12 pb-16 pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-10 lg:pb-20 lg:pt-20 xl:gap-16">
        <div className="relative z-10 lg:pb-10">
          <p className="eyebrow">The SalonBook Edit · Boutique beauty, booked with ease</p>
          <h1 className="mt-5 max-w-xl font-display text-[clamp(2.9rem,7.2vw,5.2rem)] leading-[0.9] text-balance text-charcoal">
            Your beauty.
            <br />
            <span className="ml-[0.18em] inline-block sm:ml-[0.35em]">Your moment.</span>
            <br />
            <span className="italic text-deep-red">Your style.</span>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-[15px] leading-relaxed text-muted sm:text-lg">
            Discover exceptional salon experiences and book your next appointment with ease.
            Browse services, choose a time that suits you, and manage every visit in one
            welcoming place.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/services" className={buttonStyles({ size: "lg" })}>
              Book Appointment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-charcoal transition-colors hover:text-deep-red"
            >
              Explore Services
              <span className="h-px w-8 bg-charcoal/35 transition-all duration-300 group-hover:w-11 group-hover:bg-deep-red/50" />
            </Link>
          </div>

          <div className="mt-12 flex max-w-xl flex-wrap items-center gap-x-6 gap-y-3 border-t border-warm-taupe/40 pt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-deep-red" aria-hidden />
              Hair · Nails · Skin · Massage · Makeup · Barber
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-charcoal/40" aria-hidden />
              Secure payments via Stripe
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[40rem] lg:mr-0">
          <BrandSeal
            phrase="BEAUTY, YOUR WAY"
            className="absolute -left-6 -top-6 z-20 hidden size-28 text-charcoal/70 sm:block lg:-left-10 lg:-top-8 lg:size-32"
          />

          <div className="relative">
            <div className="relative ml-auto w-[92%] overflow-hidden rounded-[28px] bg-sand shadow-elevated ring-1 ring-warm-taupe/20 sm:w-[88%]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85"
                  alt="A stylist preparing a client in a modern salon interior"
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 34rem"
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/25 to-transparent" />
            </div>

            <div className="absolute -bottom-4 left-0 w-[46%] overflow-hidden rounded-[20px] bg-sand shadow-card ring-1 ring-warm-taupe/30 sm:-bottom-6 sm:w-[42%]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85"
                  alt="A makeup artist applying a polished beauty look"
                  fill
                  sizes="(max-width: 1024px) 40vw, 14rem"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute right-0 top-[14%] hidden w-[40%] rounded-[18px] border border-warm-taupe/40 bg-soft-ivory/95 p-4 shadow-card backdrop-blur-sm sm:block lg:-right-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-deep-red">
                Book with ease
              </p>
              <p className="mt-2 font-display text-[1.25rem] leading-tight text-charcoal">
                Request online. <span className="italic">Pay after confirmation.</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Clear service details, pricing, and appointment status in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}