"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useServices } from "@/lib/queries";
import { ServiceCard } from "@/components/services/service-card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";

export function FeaturedServices() {
  const { data, isLoading, isError, refetch } = useServices({ limit: 6, sort: "newest" });
  const services = data?.data ?? [];

  return (
    <section className="border-t border-line/70 bg-ivory">
      <div className="container-page py-20 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The treatment menu"
            title="A short list of favourites."
            description="Six of the appointments our guests return to, chosen across hair, skin, nails and body."
          />
          <Link
            href="/services"
            className={buttonStyles({ variant: "outline", size: "sm", className: "self-start sm:self-auto" })}
          >
            All services
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="surface rounded-lg px-6 py-12 text-center">
              <p className="font-display text-2xl text-ink">The menu is resting.</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                We couldn&apos;t load services right now. Please try again in a moment.
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
              title="The menu is being prepared"
              description="New treatments will appear here shortly. In the meantime, create an account to be ready to book."
              action={{ label: "Create an account", href: "/sign-up" }}
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
