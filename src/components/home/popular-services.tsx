"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useServices } from "@/lib/queries";
import { ServiceCard } from "@/components/services/service-card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";

export function PopularServices() {
  const { data, isLoading, isError, refetch } = useServices({
    limit: 6,
    sort: "newest",
  });

  const services = (data?.data ?? []).slice(0, 6);

  return (
    <section id="popular-services" className="border-t border-warm-taupe/35 bg-soft-ivory">
      <div className="container-page py-20 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Popular services"
            title="Treatments worth discovering."
            description="A selection from our current menu — explore details, pricing, and availability, then request a time that suits you."
          />
          <Link
            href="/services"
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "self-start lg:self-auto",
            })}
          >
            View all services
            <ArrowRight className="size-3.5" />
          </Link>
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
                We couldn&apos;t load services at the moment. Please try again shortly.
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                className={buttonStyles({ variant: "outline", size: "sm", className: "mt-5" })}
              >
                Try again
              </button>
            </div>
          ) : services.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="No services available yet"
              description="Active treatments from the salon menu will appear here as soon as they are added."
              action={{ label: "Browse services", href: "/services" }}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
