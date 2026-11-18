import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrandStatement() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-warm-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(237,230,216,0.9) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-page relative py-16 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
              The SalonBook Manifesto
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5.8vw,4.8rem)] leading-[0.95] tracking-[-0.03em] text-balance">
              A salon appointment should feel as considered as the{" "}
              <span className="italic text-white">result.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm text-[15px] leading-relaxed text-white/70 sm:text-base">
              We bring together craft, clarity, and calm — so discovering a service, choosing a
              time, and arriving for your appointment feels effortless.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-warm-cream transition-colors hover:text-white"
            >
              Discover treatments
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            { label: "Craft", value: "Professional techniques, thoughtfully delivered." },
            { label: "Clarity", value: "Transparent details, pricing, and booking." },
            { label: "Calm", value: "A welcoming experience, from request to visit." },
          ].map((item) => (
            <div key={item.label} className="bg-charcoal/80 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-deep-red/90">
                {item.label}
              </p>
              <p className="mt-3 font-display text-[1.45rem] leading-tight text-warm-cream sm:text-[1.6rem]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}