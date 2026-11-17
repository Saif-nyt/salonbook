"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCategories } from "@/lib/queries";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategorySection() {
  const { data } = useCategories();
  const counts = new Map((data?.data ?? []).map((item) => [item.category, item.count]));

  return (
    <section className="border-t border-line/70 bg-cream">
      <div className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Find your ritual"
          title="Care for every part of you."
          description="Start with the kind of care you need. Every category is led by specialists who do that one thing exceptionally well."
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
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <p className="font-display text-2xl text-cream">{category.name}</p>
                  <p className="mt-1 text-xs text-cream/70">{category.tagline}</p>
                </div>
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cream/75">
                  {counts.get(category.name) ? `${counts.get(category.name)} treatments` : "Explore"}
                  <span className="grid size-8 place-items-center rounded-full border border-cream/30 transition-colors group-hover:border-cream group-hover:bg-cream group-hover:text-ink">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
