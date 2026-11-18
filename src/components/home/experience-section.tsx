import Image from "next/image";
import { CalendarCheck, CreditCard, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [
  {
    icon: CalendarCheck,
    title: "Convenient online booking",
    description:
      "Request appointments at a time that suits you, without back-and-forth.",
  },
  {
    icon: Search,
    title: "Easy service discovery",
    description:
      "Browse categories, compare treatments, and find the right fit with clarity.",
  },
  {
    icon: Sparkles,
    title: "Clear service pricing",
    description:
      "See pricing and duration upfront so you can book with confidence.",
  },
  {
    icon: CreditCard,
    title: "Secure online payments",
    description:
      "Manage appointments and pay for confirmed visits securely through Stripe.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="border-t border-warm-taupe/35 bg-soft-ivory">
      <div className="container-page py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Why SalonBook"
            title="A calmer way to book beauty."
            description="Genuine platform benefits designed around ease, clarity, and trust — from discovery to payment."
          />
          <p className="max-w-xl text-[15px] leading-relaxed text-muted lg:pb-1">
            Appointment management stays simple: request a time, track confirmation, and pay
            only after your visit is confirmed.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "group relative rounded-[20px] border border-warm-taupe/40 bg-warm-cream/35 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card",
                index % 2 === 1 ? "lg:translate-y-3" : "",
              )}
            >
              <span className="grid size-11 place-items-center rounded-[12px] border border-warm-taupe/35 bg-soft-ivory text-deep-red transition-transform duration-300 group-hover:scale-[1.03]">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-[1.6rem] leading-tight text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden border-t border-warm-taupe/35 bg-warm-cream">
      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-24">
        <div className="relative">
          <div className="relative aspect-[5/6] overflow-hidden rounded-[24px] bg-sand shadow-elevated">
            <Image
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85"
              alt="A bright, modern salon interior with styling stations"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-2 hidden max-w-[14.5rem] rounded-[18px] border border-white/10 bg-charcoal p-5 text-white shadow-soft sm:block lg:-left-6">
            <p className="font-display text-2xl leading-tight">About SalonBook</p>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              A modern booking experience designed to make salon visits feel effortless.
            </p>
          </div>
          <div
            className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 rounded-full border border-deep-red/20 lg:block"
            aria-hidden
          />
        </div>

        <div>
          <p className="eyebrow">About</p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] text-balance text-charcoal">
            Where craft meets <span className="italic">calm</span>.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            SalonBook brings together welcoming service and a simple digital experience. Explore
            treatments, request an appointment, and manage your visits with clarity — so the
            focus stays on how you want to look and feel.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] border border-warm-taupe/40 bg-soft-ivory p-5 shadow-card">
              <p className="font-display text-3xl text-charcoal">6</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Service categories
              </p>
            </div>
            <div className="rounded-[18px] border border-warm-taupe/40 bg-soft-ivory p-5 shadow-card">
              <p className="font-display text-3xl text-charcoal">1:1</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Personal, attentive care
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-3 text-sm text-charcoal">
            {[
              "Consultation-led appointments tailored to you",
              "Clear details, pricing, and booking flow",
              "A relaxed, welcoming salon experience",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-deep-red" />
                <span className="text-[15px] leading-relaxed text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}