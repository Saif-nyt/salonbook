import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Search } from "lucide-react";
import { BrandSeal } from "@/components/ui/brand-seal";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Choose Your Service",
    description:
      "Browse the menu, compare categories, and select the treatment that feels right for you.",
  },
  {
    icon: CalendarDays,
    number: "02",
    title: "Select Your Appointment",
    description:
      "Pick an available date and time, add any notes, and send your request in a few steps.",
  },
  {
    icon: CheckCircle2,
    number: "03",
    title: "Confirm and Enjoy",
    description:
      "Track your appointment status, pay securely after confirmation when needed, and enjoy your visit.",
  },
];

export function BookingProcess() {
  return (
    <section id="how-it-works" className="border-t border-warm-taupe/35 bg-soft-ivory">
      <div className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps to your next appointment."
          description="A clear, considered booking flow — easy to follow on any device."
          align="center"
        />

        <div className="relative mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-transparent via-warm-taupe/70 to-transparent md:block"
            aria-hidden
          />
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-[22px] border border-warm-taupe/40 bg-warm-cream/35 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-[14px] bg-charcoal text-white shadow-[0_14px_30px_-20px_rgba(28,28,28,0.8)]">
                  <step.icon className="size-5" />
                </span>
                <span className="font-display text-4xl leading-none text-warm-taupe/80">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[1.75rem] leading-tight text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.description}</p>
            </div>
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
      <BrandSeal
        phrase="THE SALONBOOK EDIT"
        tone="dark"
        className="pointer-events-none absolute -left-8 bottom-4 hidden size-32 text-white/70 opacity-60 sm:block lg:left-8 lg:size-36"
      />

      <div className="container-page relative grid gap-8 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Ready when you are
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.1rem,4.8vw,3.2rem)] leading-[1.02] text-balance text-warm-cream">
            Your next appointment, <span className="italic text-white">beautifully</span> booked.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-base">
            Explore our services, choose a time that works for you, and let SalonBook handle the
            rest with ease.
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
            About SalonBook
          </Link>
        </div>
      </div>
    </section>
  );
}