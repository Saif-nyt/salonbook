import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoryShowcase() {
  return (
    <section className="border-t border-warm-taupe/40 bg-warm-cream">
      <div className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Categories"
          title="Care, by craft."
          description="Browse by category to find the right treatment — from precision cuts to restorative skin and body care."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={`/services?category=${encodeURIComponent(category.name)}`}
              className="group relative aspect-[16/11] overflow-hidden rounded-md bg-sand"
            >
              <Image
                src={category.image}
                alt={`${category.name} services at SalonBook`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <p className="font-display text-2xl text-white">{category.name}</p>
                  <p className="mt-1 text-xs text-white/75">{category.tagline}</p>
                </div>
                <span className="grid size-9 place-items-center rounded-full border border-white/35 text-white transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-charcoal">
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