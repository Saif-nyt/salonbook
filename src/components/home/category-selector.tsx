import Link from "next/link";
import { CATEGORY_NAMES } from "@/lib/constants";

const categories = ["All", ...CATEGORY_NAMES];

export function CategorySelector() {
  return (
    <section className="border-y border-warm-taupe/30 bg-soft-neutral/60">
      <div className="container-page py-10 lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-baseline gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-gray">
              By craft
            </p>
            <span className="hidden h-px w-16 bg-warm-taupe/60 sm:block" aria-hidden />
          </div>

          <nav
            className="flex items-center gap-x-5 gap-y-3 overflow-x-auto pb-1 no-scrollbar lg:justify-end"
            aria-label="Service categories"
          >
            {categories.map((name) => {
              const isAll = name === "All";
              const href = isAll ? "/services" : `/services?category=${encodeURIComponent(name)}`;
              return (
                <Link
                  key={name}
                  href={href}
                  className="group relative shrink-0 font-display text-[1.35rem] leading-none tracking-[-0.02em] text-charcoal/70 transition-colors duration-200 hover:text-charcoal sm:text-[1.55rem]"
                >
                  {name}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-deep-red transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
