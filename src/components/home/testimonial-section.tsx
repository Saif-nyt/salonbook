import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandSeal } from "@/components/ui/brand-seal";
import { buttonStyles } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Choose your service",
    description:
      "Browse the menu, compare categories, and select the treatment that feels right for you.",
  },
  {
    number: "02",
    title: "Select your appointment",
    description:
      "Pick an available date and time, add any notes, and send your request in a few steps.",
  },
  {
    number: "03",
    title: "Confirm and enjoy",
    description:
      "Track your appointment status, pay securely after confirmation when needed, and enjoy your visit.",
  },
];

export function BookingProcess() {
  return (
    <section id="how-it-works" className="border-t border-warm-taupe/30 bg-warm-cream">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-gray">
              How it works
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.5vw,3.6rem)] leading-[0.95] tracking-[-0.03em] text-charcoal">
              Three steps.
              <br />
              <span className="italic text-deep-red">Beautifully</span> simple.
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted sm:text-base">
              A clear, considered booking flow — easy to follow on any device, from first browse
              to confirmed appointment.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-warm-taupe/35 border-y border-warm-taupe/35">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-10"
                >
                  <p className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none tracking-[-0.04em] text-charcoal/[0.12]">
                    {step.number}
                  </p>
                  <div className="pt-1">
                    <h3 className="font-display text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-[2.1rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-warm-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(237,230,216,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,230,216,0.8) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-deep-red/20 blur-3xl"
        aria-hidden
      />
      <BrandSeal
        phrase="THE SALONBOOK EDIT"
        tone="dark"
        className="pointer-events-none absolute right-6 top-8 hidden size-28 text-white/70 opacity-50 lg:block"
      />

      <div className="container-page relative py-20 lg:py-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
          Your next visit
        </p>
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.9] tracking-[-0.04em] text-balance text-warm-cream">
              Step into your
              <br />
              <span className="italic text-white">next appointment.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm text-[15px] leading-relaxed text-white/70 sm:text-base">
              Explore the menu, choose a time that works, and book with confidence — SalonBook
              keeps the rest beautifully simple.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services" className={buttonStyles({ size: "lg", className: "group" })}>
                Book now
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#story"
                className={buttonStyles({
                  variant: "outline",
                  size: "lg",
                  className:
                    "border-white/25 bg-transparent text-warm-cream hover:border-white/50 hover:bg-white/5 hover:text-white",
                })}
              >
                Our story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}