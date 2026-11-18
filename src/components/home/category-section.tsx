import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoryShowcase() {
  return (
    <section className="border-t border-warm-taupe/35 bg-warm-cream">
      <div className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Categories"
          title="Care, by craft."
          description="Browse by category to find the right treatment — from precision cuts to restorative skin and body care."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((category, index) => (
            <Link
              key={category.name}
              href={`/services?category=${encodeURIComponent(category.name)}`}
              className={cn(
                "group relative overflow-hidden rounded-[20px] bg-sand shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated",
                index === 0 || index === 3 ? "aspect-[16/11] lg:aspect-[16/12]" : "aspect-[16/11]",
              )}
            >
              <Image
                src={category.image}
                alt={`${category.name} services at SalonBook`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-charcoal/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="font-display text-[1.9rem] leading-none text-white">{category.name}</p>
                  <p className="mt-1.5 text-sm text-white/80">{category.tagline}</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full border border-white/35 bg-white/5 text-white backdrop-blur-sm transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-charcoal">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}