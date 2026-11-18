import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const qualities = [
  {
    index: "01",
    title: "Consultation-led care",
    description:
      "Every visit begins with clarity — understanding what you want and how you want to feel.",
  },
  {
    index: "02",
    title: "Considered techniques",
    description:
      "Professional products and attentive craft, delivered with consistency and calm.",
  },
  {
    index: "03",
    title: "A welcoming space",
    description:
      "An environment designed for comfort, so each appointment feels unhurried and personal.",
  },
];

export function BrandQualitySection() {
  return (
    <section className="relative overflow-hidden border-t border-warm-taupe/30 bg-soft-neutral/70">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-gray">
              The standard
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.8vw,3.8rem)] leading-[0.95] tracking-[-0.03em] text-charcoal">
              Premium in feeling.
              <br />
              <span className="italic text-muted-burgundy">Thoughtful</span> in detail.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
              SalonBook is designed around the experience you deserve — clear choices, easy
              booking, and treatments that feel personal from consultation to finish.
            </p>

            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[24px] bg-sand shadow-card lg:block">
              <Image
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=85"
                alt="A calm skincare treatment in a premium salon setting"
                fill
                sizes="35vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <div className="space-y-0 border-t border-warm-taupe/40">
              {qualities.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 border-b border-warm-taupe/40 py-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-9"
                >
                  <span className="font-display text-[1.4rem] leading-none tracking-[0.08em] text-muted-burgundy/70">
                    {item.index}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.8rem] leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-[2rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:text-deep-red"
            >
              Explore the menu
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
