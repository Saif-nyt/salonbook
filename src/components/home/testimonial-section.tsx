import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

export function TestimonialSection() {
  return (
    <section className="border-t border-line/70 bg-sand/55">
      <div className="container-page py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">In their words</p>
            <Quote className="mt-6 size-7 text-terracotta/50" />
            <blockquote className="mt-4 font-display text-3xl leading-[1.2] text-balance text-ink sm:text-4xl">
              “The kind of place you leave feeling more like yourself. I have never had
              to explain what I wanted twice.”
            </blockquote>
            <div className="mt-6">
              <p className="text-sm font-semibold text-ink">Amara J.</p>
              <p className="text-xs text-muted">Guest since 2021 · Hair & skin</p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
            {[
              { value: "4.9 / 5", label: "Average guest rating", detail: "Across 320+ verified reviews" },
              { value: "92%", label: "Return within 8 weeks", detail: "Guests who rebook with us" },
              { value: "12", label: "Specialist practitioners", detail: "Hair, skin, nails, body" },
              { value: "7 days", label: "A week of availability", detail: "Tuesday through Saturday" },
            ].map((item) => (
              <div key={item.label} className="bg-cream p-6">
                <p className="font-display text-3xl text-terracotta">{item.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  {item.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeCta() {
  return (
    <section className="bg-ink">
      <div className="container-page grid gap-8 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/45">
            Your next appointment
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-balance text-cream sm:text-5xl">
            Make a little room for yourself.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/60">
            Browse the menu, choose a time, and let us take care of the rest. New guests
            are always welcome.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link
            href="/services"
            className={buttonStyles({ size: "lg", className: "bg-cream text-ink hover:bg-sand" })}
          >
            Browse services
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/sign-up"
            className={buttonStyles({
              variant: "outline",
              size: "lg",
              className: "border-cream/30 text-cream hover:bg-cream/10",
            })}
          >
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
}
