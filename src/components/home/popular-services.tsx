"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { useServices } from "@/lib/queries";
import type { Service } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { CardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80";

function FeaturedEditorialCard({ service }: { service: Service }) {
  const src = service.image || FALLBACK_IMAGE;
  return (
    <article className="group relative overflow-hidden rounded-[28px] bg-charcoal text-white lg:col-span-7 lg:row-span-2">
      <Link href={`/services/${service.id}`} className="absolute inset-0 z-0 block" aria-label={`View ${service.serviceName}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={service.serviceName}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-charcoal/10" />
      </Link>
      <div className="relative z-10 flex h-full min-h-[26rem] flex-col justify-end p-6 sm:p-8 lg:min-h-full lg:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
          Featured from the menu
        </p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-deep-red/90">
          {service.category}
        </p>
        <h3 className="mt-3 max-w-xl font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.03em] text-white">
          <Link href={`/services/${service.id}`} className="transition-colors hover:text-warm-cream">
            {service.serviceName}
          </Link>
        </h3>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75 line-clamp-3">
          {service.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-5">
          <p className="font-display text-3xl text-white">{formatMoney(service.price)}</p>
          <span className="inline-flex items-center gap-1.5 text-sm text-white/75">
            <Clock className="size-4" />
            {service.duration} min
          </span>
          <Link
            href={`/services/${service.id}`}
            className={buttonStyles({
              size: "sm",
              className: "ml-auto bg-deep-red text-white hover:bg-deep-red-dark",
            })}
          >
            View & book
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function EditorialServiceTile({
  service,
  emphasis = false,
}: {
  service: Service;
  emphasis?: boolean;
}) {
  const src = service.image || FALLBACK_IMAGE;
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[22px] border border-warm-taupe/35 bg-soft-ivory transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated ${
        emphasis ? "lg:col-span-5" : "lg:col-span-5"
      }`}
    >
      <Link href={`/services/${service.id}`} className={`relative block overflow-hidden bg-sand ${emphasis ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[4/3] lg:aspect-[16/10]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={service.serviceName}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-soft-ivory/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal backdrop-blur-sm">
          {service.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.6rem] leading-[1.05] tracking-[-0.02em] text-charcoal">
            <Link href={`/services/${service.id}`} className="transition-colors hover:text-deep-red">
              {service.serviceName}
            </Link>
          </h3>
          <span className="shrink-0 font-display text-xl text-charcoal">{formatMoney(service.price)}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted">{service.description}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-gray">
            <Clock className="size-3.5" />
            {service.duration} min
          </span>
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors hover:text-deep-red"
          >
            View details
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PopularServices() {
  const { data, isLoading, isError, refetch } = useServices({
    limit: 6,
    sort: "newest",
  });

  const services = (data?.data ?? []).slice(0, 6);
  const [lead, ...rest] = services;

  return (
    <section id="popular-services" className="relative overflow-hidden border-t border-warm-taupe/35 bg-warm-cream">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">From the menu</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-balance text-charcoal">
              Treatments with{" "}
              <span className="italic text-deep-red">presence.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
            <p className="max-w-md text-[15px] leading-relaxed text-muted lg:text-right">
              A photography-led selection from our current services — real treatments, clear
              pricing, and a direct path to booking.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:text-deep-red"
            >
              View full menu
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7 lg:row-span-2">
                <CardSkeleton />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>
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
            <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
              <FeaturedEditorialCard service={lead} />
              {rest.slice(0, 2).map((service, index) => (
                <EditorialServiceTile key={service.id} service={service} emphasis={index === 0} />
              ))}
              {rest.length > 2 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
                  {rest.slice(2).map((service) => (
                    <EditorialServiceTile key={service.id} service={service} />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
