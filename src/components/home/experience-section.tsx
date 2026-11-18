import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const reasons = [
  {
    number: "01",
    title: "Convenient online booking",
    description:
      "Request appointments at a time that suits you, without back-and-forth.",
  },
  {
    number: "02",
    title: "Easy service discovery",
    description:
      "Browse categories, compare treatments, and find the right fit with clarity.",
  },
  {
    number: "03",
    title: "Clear service pricing",
    description:
      "See pricing and duration upfront so you can book with confidence.",
  },
  {
    number: "04",
    title: "Secure online payments",
    description:
      "Manage appointments and pay for confirmed visits securely through Stripe.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="border-t border-warm-taupe/30 bg-soft-ivory">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-gray">
              Why SalonBook
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.94] tracking-[-0.03em] text-charcoal">
              Booking beauty,
              <br />
              <span className="italic text-deep-red">without</span> the friction.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
              Genuine platform benefits designed around ease, clarity, and trust — from
              discovering a service to confirming your visit.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:text-deep-red"
            >
              Explore services
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {reasons.map((item, index) => (
                <div
                  key={item.title}
                  className={index % 2 === 1 ? "sm:pt-10" : ""}
                >
                  <p className="font-display text-[3.2rem] leading-none tracking-[-0.04em] text-warm-taupe/60">
                    {item.number}
                  </p>
                  <h3 className="mt-2 font-display text-[1.7rem] leading-[1.05] tracking-[-0.02em] text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <div className="mt-5 h-px w-12 bg-deep-red/40" aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden border-t border-warm-taupe/30 bg-warm-cream">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:pt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-gray">
              About the salon
            </p>
            <h2 className="mt-5 max-w-lg font-display text-[clamp(2.3rem,5vw,3.8rem)] leading-[0.95] tracking-[-0.03em] text-charcoal">
              Where craft meets <span className="italic text-deep-red">calm.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
              SalonBook brings together welcoming service and a simple digital experience. Explore
              treatments, request an appointment, and manage your visits with clarity — so the
              focus stays on how you want to look and feel.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-warm-taupe/40 pt-8">
              <div>
                <p className="font-display text-[2.6rem] leading-none tracking-[-0.03em] text-charcoal">06</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-gray">
                  Service categories
                </p>
              </div>
              <div>
                <p className="font-display text-[2.6rem] leading-none tracking-[-0.03em] text-charcoal">
                  1<span className="italic text-deep-red">:</span>1
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-gray">
                  Personal, attentive care
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {[
                "Consultation-led appointments tailored to you",
                "Clear details, pricing, and booking flow",
                "A relaxed, welcoming salon experience",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-2 h-px w-4 shrink-0 bg-deep-red/60" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-12 sm:items-end">
              <div className="relative overflow-hidden rounded-[26px] bg-sand shadow-elevated sm:col-span-7">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85"
                    alt="A bright, modern salon interior with styling stations"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:col-span-5">
                <div className="relative overflow-hidden rounded-[22px] bg-sand shadow-card ring-1 ring-warm-taupe/20">
                  <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                    <Image
                      src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=85"
                      alt="A beauty professional providing attentive salon care"
                      fill
                      sizes="(max-width: 1024px) 45vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-charcoal p-5 text-warm-cream shadow-soft">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Our approach
                  </p>
                  <p className="mt-2 font-display text-[1.5rem] leading-tight">
                    Skilled hands. <span className="italic text-white">Honest</span> service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}