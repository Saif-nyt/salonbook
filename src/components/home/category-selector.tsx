import Link from "next/link";
import { CATEGORY_NAMES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";

const categories = ["All", ...CATEGORY_NAMES];

export function CategorySelector() {
  return (
    <section className="border-t border-warm-taupe/35 bg-warm-cream">
      <div className="container-page py-14 lg:py-16">
        <SectionHeading
          eyebrow="Service categories"
          title="Find your next treatment."
          description="Explore by craft — from precision hair and barbering to skin, nails, massage, and makeup."
          align="center"
        />

        <div
          className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar sm:justify-center"
          role="navigation"
          aria-label="Service categories"
        >
          {categories.map((name, index) => {
            const isAll = name === "All";
            const href = isAll ? "/services" : `/services?category=${encodeURIComponent(name)}`;
            const highlight = index === 0;

            return (
              <Link
                key={name}
                href={href}
                className={
                  highlight
                    ? "shrink-0 rounded-full border border-deep-red bg-deep-red px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-white shadow-[0_14px_30px_-20px_rgba(179,38,30,0.7)] transition-all duration-200 hover:bg-deep-red-dark"
                    : "shrink-0 rounded-full border border-warm-taupe/55 bg-soft-ivory/70 px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-charcoal transition-all duration-200 hover:border-charcoal/30 hover:bg-soft-ivory"
                }
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
