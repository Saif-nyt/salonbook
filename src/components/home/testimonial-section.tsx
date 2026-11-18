import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, CreditCard, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    icon: Search,
    title: "Explore services",
    description: "Browse salon services by category and view the details that matter to you.",
  },
  {
    icon: CalendarDays,
    title: "Request an appointment",
    description: "Choose an available date and time slot and send your booking request online.",
  },
  {
    icon: CheckCircle2,
    title: "Track confirmation",
    description: "Manage your appointment requests and follow updates as they are reviewed and confirmed.",
  },
  {
    icon: CreditCard,
    title: "Pay when confirmed",
    description: "Pay securely for confirmed appointments through Stripe checkout.",
  },
];

const testimonials = [
  {
    quote:
      "Booking felt effortless, and the experience in the salon was even better. Everything was calm, professional and beautifully done.",
    name: "Amara J.",
    detail: "Hair & skin guest",
  },
  {
    quote:
      "I loved how easy it was to find the right service and manage my appointment. It feels like a genuinely premium experience.",
    name: "Daniel R.",
    detail: "Barber & grooming guest",
  },
  {
    quote:
      "Clear pricing, thoughtful service and a space that instantly puts you at ease. I’ve already rebooked my next visit.",
    name: "Maya C.",
    detail: "Nails & massage guest",
  },
];

export function BookingProcess() {
  return (
    <section className="border-t border-warm-taupe/35 bg-soft-ivory">
      <div className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Booking process"
          title="From discovery to appointment, made simple."
          description="A clear flow designed to help you book with confidence at every step."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative overflow-hidden rounded-[20px] border border-warm-taupe/40 bg-warm-cream/35 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-deep-red/5" aria-hidden />
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-[12px] border border-warm-taupe/40 bg-soft-ivory text-charcoal">
                  <step.icon className="size-5" />
                </span>
                <span className="font-display text-2xl text-warm-taupe">0{index + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-[1.7rem] leading-tight text-charcoal">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section className="border-t border-warm-taupe/35 bg-warm-cream">
      <div className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Customer testimonials"
          title="Trusted by guests who value the details."
          description="A salon experience should feel welcoming, reliable and worth returning to."
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              className={cn(
                "flex h-full flex-col rounded-[22px] border border-warm-taupe/40 bg-soft-ivory p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated sm:p-7",
                index === 1 ? "lg:-translate-y-2" : "",
              )}
            >
              <div className="text-deep-red/25" aria-hidden>
                <span className="font-display text-5xl leading-none">“</span>
              </div>
              <blockquote className="-mt-2 flex-1 font-display text-[1.6rem] leading-[1.25] text-charcoal sm:text-[1.7rem]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-warm-taupe/35 pt-4">
                <p className="text-sm font-semibold text-charcoal">{item.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted">
                  {item.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div
        className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full bg-deep-red/25 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative grid gap-8 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Ready when you are
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] text-balance text-white">
            Book an appointment that feels <span className="italic text-white/90">considered</span> from start to finish.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-base">
            Explore our services, choose a time that works for you, and let SalonBook take
            care of the rest.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link href="/services" className={buttonStyles({ size: "lg" })}>
            Book Appointment
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/#story"
            className={buttonStyles({
              variant: "outline",
              size: "lg",
              className:
                "border-white/30 bg-white/0 text-white hover:border-white hover:bg-white/10",
            })}
          >
            Discover Our Salon
          </Link>
        </div>
      </div>
    </section>
  );
}