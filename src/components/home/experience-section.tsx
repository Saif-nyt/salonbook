import Image from "next/image";
import { CalendarCheck, ShieldCheck, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";
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
    <section className="border-t border-warm-taupe/35 bg-soft-ivory">
      <div className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Why choose SalonBook"
          title="A premium salon experience, without the friction."
          description="Every detail — from discovery to checkout — is designed to feel clear, calm and dependable."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "group rounded-[20px] border border-warm-taupe/40 bg-warm-cream/35 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card",
                index === 1 ? "lg:translate-y-2" : "",
              )}
            >
              <span className="grid size-11 place-items-center rounded-[12px] bg-charcoal text-white shadow-[0_14px_30px_-20px_rgba(28,28,28,0.8)] transition-transform duration-300 group-hover:scale-[1.03]">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-[1.7rem] leading-tight text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
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
            <p className="font-display text-2xl leading-tight">Our Story</p>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Skilled hands, honest service, and time that feels genuinely well spent.
            </p>
          </div>
          <div
            className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 rounded-full border border-deep-red/20 lg:block"
            aria-hidden
          />
        </div>

        <div>
          <p className="eyebrow">Our experience</p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] text-balance text-charcoal">
            Where craft meets <span className="italic">calm</span>.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            SalonBook brings together talented specialists and a welcoming space so every visit
            feels unhurried and personal. From your first consultation to the final detail, we
            focus on quality, comfort and results you can trust.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] border border-warm-taupe/40 bg-soft-ivory p-5 shadow-card">
              <p className="font-display text-3xl text-charcoal">8+ years</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Serving our community
              </p>
            </div>
            <div className="rounded-[18px] border border-warm-taupe/40 bg-soft-ivory p-5 shadow-card">
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