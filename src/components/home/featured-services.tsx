"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useServices } from "@/lib/queries";
import { CATEGORY_NAMES } from "@/lib/constants";
import { ServiceCard } from "@/components/services/service-card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTERS = ["All", ...CATEGORY_NAMES];

export function FeaturedServices() {
  const [selected, setSelected] = useState("All");
  const { data, isLoading, isError, refetch } = useServices({
    limit: 12,
    sort: "newest",
  });

  const services = useMemo(() => data?.data ?? [], [data?.data]);
  const filtered = useMemo(() => {
    const base =
      selected === "All"
        ? services
        : services.filter((service) => service.category === selected);
    return base.slice(0, 6);
  }, [services, selected]);

  return (
    <section id="featured-services" className="border-t border-warm-taupe/35 bg-soft-ivory">
      <div className="container-page py-20 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured services"
            title="Treatments chosen for how they make you feel."
            description="Explore active services across hair, skin, nails, massage, makeup and barbering — each with clear details, pricing and easy booking."
          />
          <Link
            href="/services"
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "self-start lg:self-auto",
            })}
          >
            Browse all services
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((name) => {
            const active = selected === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setSelected(name)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-semibold tracking-[0.01em] transition-all duration-200",
                  active
                    ? "border-charcoal bg-charcoal text-white shadow-[0_10px_24px_-18px_rgba(28,28,28,0.7)]"
                    : "border-warm-taupe/55 bg-warm-cream/40 text-charcoal hover:border-deep-red/35 hover:text-deep-red",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="surface rounded-[20px] px-6 py-14 text-center">
              <p className="font-display text-3xl text-charcoal">Services are unavailable right now.</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
                We couldn&apos;t load featured treatments. Please try again in a moment.
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                className={buttonStyles({ variant: "outline", size: "sm", className: "mt-5" })}
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="No featured services yet"
              description={
                selected === "All"
                  ? "Active treatments will appear here as soon as they are added to the menu."
                  : `There are no active ${selected.toLowerCase()} services at the moment. Try another category or browse the full menu.`
              }
              action={{ label: "Explore services", href: "/services" }}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}