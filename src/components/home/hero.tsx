import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-cream">
      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow">SalonBook · Salon Appointment Booking</p>
          <h1 className="mt-5 font-display text-[clamp(3.2rem,7vw,6rem)] leading-[0.95] text-balance text-charcoal">
            Explore services and book salon appointments online.
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Browse salon services, view details and pricing, and request an appointment
            time in a few simple steps. Confirmed visits can be managed and paid securely.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/services" className={buttonStyles({ size: "lg" })}>
              Explore Salon Services
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#story"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Discover Our Salon
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-warm-taupe/50 pt-8">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Guest rating
              </dt>
              <dd className="mt-1 font-display text-3xl text-charcoal">4.9/5</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Specialists
              </dt>
              <dd className="mt-1 font-display text-3xl text-charcoal">12+</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Services
              </dt>
              <dd className="mt-1 font-display text-3xl text-charcoal">Curated</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[36rem] lg:mr-0">
          <div className="grid grid-cols-12 grid-rows-12 gap-3 sm:gap-4">
            <div className="relative col-span-8 row-span-12 aspect-[4/5] overflow-hidden rounded-md bg-sand">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85"
                alt="A stylist preparing a client in a modern salon interior"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 28rem"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-4 row-span-7 mt-8 overflow-hidden rounded-md bg-sand">
              <Image
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=85"
                alt="Skincare treatment products arranged on a tray"
                fill
                sizes="(max-width: 1024px) 30vw, 12rem"
                className="object-cover"
              />
            </div>
            <div className="col-span-4 row-span-5 flex flex-col justify-between rounded-md border border-warm-taupe/50 bg-soft-ivory p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-deep-red">
                Open today
              </p>
              <div>
                <p className="font-display text-2xl leading-tight text-charcoal">
                  Thoughtful care, beautifully booked.
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