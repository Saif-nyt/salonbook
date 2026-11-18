import Image from "next/image";
import { CalendarCheck, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [
  {
    icon: Sparkles,
    title: "Explore with ease",
    description:
      "Browse salon services, compare details and find the right treatment for your visit.",
  },
  {
    icon: CalendarCheck,
    title: "Request online",
    description:
      "View availability, choose a time and request appointments from anywhere in a few steps.",
  },
  {
    icon: ShieldCheck,
    title: "Secure when confirmed",
    description:
      "Manage your requests and pay for confirmed appointments securely through Stripe.",
  },
  {
    icon: Users,
    title: "Managed with care",
    description:
      "Administrators review requests, manage services and keep bookings running smoothly.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="border-t border-warm-taupe/40 bg-soft-ivory">
      <div className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Why choose SalonBook"
          title="A premium salon experience, without the friction."
          description="Every detail — from discovery to checkout — is designed to feel clear, calm and dependable."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-warm-taupe/50 bg-warm-cream/40 p-6 transition-shadow hover:shadow-card"
            >
              <span className="grid size-11 place-items-center rounded-md bg-charcoal text-white">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl leading-tight text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="border-t border-warm-taupe/40 bg-warm-cream">
      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="relative">
          <div className="relative aspect-[5/6] overflow-hidden rounded-md bg-sand">
            <Image
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85"
              alt="A bright, modern salon interior with styling stations"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-2 hidden max-w-[14rem] rounded-md bg-charcoal p-5 text-white shadow-soft sm:block lg:-right-6">
            <p className="font-display text-2xl leading-tight">Our Story</p>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Built around skilled hands, honest service and time that feels well spent.
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow">Our experience</p>
          <h2 className="mt-3 max-w-lg font-display text-4xl leading-[1.05] text-balance text-charcoal sm:text-5xl">
            Where craft meets calm.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            SalonBook brings together talented specialists and a welcoming space so every
            visit feels unhurried and personal. From your first consultation to the final
            detail, we focus on quality, comfort and results you can trust.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-warm-taupe/50 bg-soft-ivory p-5">
              <p className="font-display text-3xl text-charcoal">8+ years</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Serving our community
              </p>
            </div>
            <div className="rounded-md border border-warm-taupe/50 bg-soft-ivory p-5">
              <p className="font-display text-3xl text-charcoal">1:1 care</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Personal, attentive service
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-3 text-sm text-charcoal">
            {[
              "Consultation-led appointments tailored to you",
              "Professional products and considered techniques",
              "A relaxed environment designed for comfort",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-deep-red" />
                <span className="leading-relaxed text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}