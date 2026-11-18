import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

export function BurgundyPromoSection() {
  return (
    <section className="relative overflow-hidden bg-muted-burgundy text-warm-cream">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-black/10 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-24">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-charcoal/20 shadow-elevated ring-1 ring-white/10 sm:aspect-[5/6] lg:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=85"
              alt="A serene, premium salon interior prepared for a client visit"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-2 hidden max-w-[13rem] rounded-[18px] border border-white/15 bg-charcoal/85 p-4 text-white shadow-soft backdrop-blur-sm sm:block lg:-right-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              The SalonBook Edit
            </p>
            <p className="mt-2 font-display text-[1.35rem] leading-tight">
              Time set aside, <span className="italic">just for you.</span>
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-warm-cream/70">
            An invitation
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.96] tracking-[-0.03em] text-balance text-warm-cream">
            Make room for the appointment you&apos;ve been meaning to{" "}
            <span className="italic text-white">book.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-warm-cream/80 sm:text-base">
            Whether it&apos;s a precise cut, a restorative facial, or a moment to reset, SalonBook
            makes it simple to find the right service and request a time that fits your day.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-warm-cream/85">
            {[
              "Browse treatments across six service categories",
              "Request appointments online with clear details",
              "Pay securely for confirmed visits through Stripe",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warm-cream/80" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/services"
              className={buttonStyles({
                size: "lg",
                className:
                  "bg-warm-cream text-charcoal shadow-none hover:bg-white hover:text-charcoal",
              })}
            >
              Book an appointment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center text-[13px] font-semibold uppercase tracking-[0.16em] text-warm-cream/85 underline decoration-warm-cream/35 underline-offset-4 transition-colors hover:text-white"
            >
              How it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}