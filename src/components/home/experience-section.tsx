import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

const principles = [
  {
    number: "01",
    title: "Consultation first",
    copy: "Every visit begins with a conversation. We listen before we recommend, and never rush the decision.",
  },
  {
    number: "02",
    title: "Products we believe in",
    copy: "A tightly edited shelf of professional, low-impact products chosen for how they feel and how they perform.",
  },
  {
    number: "03",
    title: "Time to settle",
    copy: "Generous appointment lengths, a quiet room and no overlapping chairs. Your time is held for you.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-line/70 bg-ivory">
      <div className="container-page grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/6] overflow-hidden rounded-md bg-sand">
            <Image
              src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=85"
              alt="A stylist finishing a client's hair in the SalonBook studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 hidden max-w-[13rem] bg-ink p-5 text-cream shadow-soft sm:block lg:-right-6">
            <p className="font-display text-2xl leading-tight">Small by design.</p>
            <p className="mt-2 text-xs leading-relaxed text-cream/65">
              One guest, one specialist, one quiet room at a time.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow">The SalonBook difference</p>
          <h2 className="mt-3 max-w-lg font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl">
            An appointment that feels like a pause.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-[1.8] text-muted">
            We built SalonBook around the parts of a salon visit that are easy to lose:
            attention, space and a genuine point of view. Everything else follows from
            there.
          </p>

          <div className="mt-9 space-y-6">
            {principles.map((item) => (
              <div key={item.number} className="flex gap-5 border-t border-line pt-6">
                <span className="font-display text-lg italic text-terracotta/70">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/services" className={buttonStyles({ size: "md" })}>
              Find a treatment
              <ArrowRight className="size-4" />
            </Link>
            <span className="flex items-center gap-2 text-xs text-muted">
              <Check className="size-4 text-sage" />
              No membership required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
