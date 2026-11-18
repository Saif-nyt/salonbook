import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const principles = [
  {
    index: "01",
    label: "Craft",
    description: "Professional techniques, thoughtfully delivered.",
  },
  {
    index: "02",
    label: "Clarity",
    description: "Transparent details, pricing, and booking.",
  },
  {
    index: "03",
    label: "Calm",
    description: "A welcoming experience, from request to visit.",
  },
];

export function BrandStatement() {
  return (
    <section className="relative overflow-hidden bg-[#1C1C1C] text-[#F8F6F1]">
      <div
        className="pointer-events-none absolute -right-24 top-0 size-[26rem] rounded-full bg-[#B3261E]/10 blur-[130px]"
        aria-hidden
      />

      <div className="container-page relative py-12 sm:py-14 lg:py-20">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="size-1.5 shrink-0 rounded-full bg-[#B3261E]" aria-hidden />
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A9A39A]">
            The SalonBook Manifesto
          </p>
          <span className="h-px flex-1 bg-[#393632]" aria-hidden />
        </div>

        <div className="mt-3.5 grid gap-6 sm:mt-4 lg:mt-5 lg:grid-cols-12 lg:items-start lg:gap-12">
          <h2 className="text-balance font-display text-[clamp(2.05rem,5vw,4.15rem)] leading-[1.01] tracking-[-0.035em] text-[#F8F6F1] lg:col-span-8">
            A salon appointment should feel as considered as the{" "}
            <span className="italic">result.</span>
          </h2>

          <div className="lg:col-span-4 lg:pt-2">
            <p className="max-w-md text-pretty text-[15px] leading-[1.7] text-[#A9A39A]">
              We bring together craft, clarity, and calm — so discovering a
              service, choosing a time, and arriving for your appointment feels
              effortless.
            </p>
            <Link
              href="/services"
              className="group mt-5 inline-flex items-center gap-2 border-b border-[#393632] pb-1.5 text-[13px] font-medium text-[#F8F6F1] transition-colors duration-300 hover:border-[#B3261E]"
            >
              Discover treatments
              <ArrowUpRight className="size-3.5 text-[#B3261E] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-9 divide-y divide-[#393632] border-t border-[#393632] sm:mt-10 md:grid md:grid-cols-3 md:divide-x md:divide-y-0 lg:mt-12">
          {principles.map((principle) => (
            <div
              key={principle.label}
              className="group py-5 md:px-6 md:py-6 md:first:pl-0 md:last:pr-0 lg:py-7"
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="text-[10px] font-semibold tracking-[0.08em] text-[#B3261E]"
                  aria-hidden
                >
                  {principle.index}
                </span>
                <h3 className="font-display text-[1.55rem] leading-none tracking-[-0.015em] text-[#F8F6F1] sm:text-[1.65rem]">
                  {principle.label}
                </h3>
              </div>
              <span
                className="mt-3.5 block h-px w-7 bg-[#393632] transition-all duration-300 group-hover:w-11 group-hover:bg-[#B3261E]"
                aria-hidden
              />
              <p className="mt-3.5 max-w-[27ch] text-[13.5px] leading-[1.65] text-[#A9A39A] transition-colors duration-300 group-hover:text-[#F8F6F1] sm:text-sm">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
