import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-cream">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-deep-red/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-warm-taupe/30 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24 xl:py-28">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">SalonBook · Modern beauty, beautifully booked</p>
          <h1 className="mt-5 font-display text-[clamp(2.8rem,7vw,4.8rem)] leading-[0.93] text-balance text-charcoal">
            Your beauty.
            <br />
            Your moment.
            <br />
            <span className="italic text-deep-red">Your style.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
            Discover exceptional salon experiences and book your next appointment with ease.
            Explore curated treatments, choose a time that suits you, and manage every visit in
            one welcoming place.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/services" className={buttonStyles({ size: "lg" })}>
              Book Appointment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/services"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Explore Services
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-warm-taupe/40 pt-8 sm:gap-8">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Guest rating
              </dt>
              <dd className="mt-1 font-display text-3xl leading-none text-charcoal sm:text-4xl">4.9/5</dd>
              <dd className="mt-1 text-xs text-muted">Loved by returning clients</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Specialists
              </dt>
              <dd className="mt-1 font-display text-3xl leading-none text-charcoal sm:text-4xl">12+</dd>
              <dd className="mt-1 text-xs text-muted">Skilled, attentive pros</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Treatments
              </dt>
              <dd className="mt-1 font-display text-3xl leading-none text-charcoal sm:text-4xl">Curated</dd>
              <dd className="mt-1 text-xs text-muted">Hair, skin, nails & more</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[38rem] lg:mr-0">
          <div className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-full border border-deep-red/20 sm:block" aria-hidden />
          <div className="grid grid-cols-12 grid-rows-12 gap-3 sm:gap-4">
            <div className="relative col-span-8 row-span-12 overflow-hidden rounded-[24px] bg-sand shadow-elevated">
              <div className="aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85"
                  alt="A stylist preparing a client in a modern salon interior"
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 30rem"
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-charcoal/25 to-transparent" />
            </div>

            <div className="relative col-span-4 row-span-7 mt-10 overflow-hidden rounded-[20px] bg-sand ring-1 ring-warm-taupe/30">
              <Image
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=85"
                alt="Skincare treatment products arranged on a tray"
                fill
                sizes="(max-width: 1024px) 30vw, 12rem"
                className="object-cover"
              />
            </div>

            <div className="col-span-4 row-span-5 flex flex-col justify-between rounded-[20px] border border-warm-taupe/40 bg-soft-ivory/95 p-4 shadow-card backdrop-blur-sm sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-deep-red">
                Open today
              </p>
              <div>
                <p className="font-display text-[1.35rem] leading-tight text-charcoal sm:text-2xl">
                  Thoughtful care, <span className="italic">beautifully</span> booked.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Tue–Fri 9–7 · Sat 9–6
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}