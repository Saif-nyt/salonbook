import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandSeal } from "@/components/ui/brand-seal";
import { buttonStyles } from "@/components/ui/button";

const qualities = [
  {
    title: "Consultation-led care",
    description:
      "Every visit begins with clarity — understanding what you want and how you want to feel.",
  },
  {
    title: "Considered techniques",
    description:
      "Professional products and attentive craft, delivered with consistency and calm.",
  },
  {
    title: "A welcoming space",
    description:
      "An environment designed for comfort, so each appointment feels unhurried and personal.",
  },
];

export function BrandQualitySection() {
  return (
    <section className="relative overflow-hidden border-t border-warm-taupe/35 bg-warm-cream">
      <BrandSeal
        phrase="YOUR MOMENT"
        className="absolute -right-10 top-10 hidden size-36 text-charcoal/60 opacity-70 lg:block"
      />
      <div className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-sand shadow-elevated">
            <Image
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85"
              alt="A stylist crafting a polished hair look in a calm salon setting"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 max-w-[15rem] rounded-[18px] border border-warm-taupe/40 bg-soft-ivory/95 p-4 shadow-card backdrop-blur-sm sm:left-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-deep-red">
              Service quality
            </p>
            <p className="mt-2 font-display text-xl leading-tight text-charcoal">
              Beauty, delivered with <span className="italic">care</span>.
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow">The SalonBook standard</p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] text-balance text-charcoal">
            Premium in feeling. <span className="italic">Thoughtful</span> in every detail.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            SalonBook is designed around the experience you deserve — clear choices, easy
            booking, and treatments that feel personal from consultation to finish.
          </p>

          <div className="mt-8 space-y-5">
            {qualities.map((item, index) => (
              <div key={item.title} className="flex gap-4">
                <span className="font-display text-2xl leading-none text-warm-taupe">
                  0{index + 1}
                </span>
                <div className="border-t border-warm-taupe/35 pt-1">
                  <h3 className="font-display text-[1.45rem] leading-tight text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/services" className={buttonStyles({ variant: "outline", className: "mt-9" })}>
            Explore the menu
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
