"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, Clock, Search, SlidersHorizontal, X, SearchX } from "lucide-react";
import { useServices } from "@/lib/queries";
import { CATEGORY_NAMES, SERVICE_SORTS } from "@/lib/constants";
import type { Service } from "@/lib/types";
import { formatMoney, cn } from "@/lib/utils";
import { CardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { buttonStyles } from "@/components/ui/button";

const PAGE_SIZE = 9;
const CATEGORIES = ["All", ...CATEGORY_NAMES];
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80";

function BrowseServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  const [src, setSrc] = useState(service.image || FALLBACK_IMAGE);

  if (featured) {
    return (
      <article className="group grid overflow-hidden rounded-[28px] border border-warm-taupe/35 bg-soft-ivory shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated lg:grid-cols-[1.15fr_0.85fr]">
        <Link
          href={`/services/${service.id}`}
          className="relative block aspect-[4/3] overflow-hidden bg-sand lg:aspect-auto lg:min-h-[22rem]"
          aria-label={`View ${service.serviceName}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={service.serviceName}
            loading="lazy"
            onError={() => {
              if (src !== FALLBACK_IMAGE) setSrc(FALLBACK_IMAGE);
            }}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-soft-ivory/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal backdrop-blur-sm">
            {service.category}
          </span>
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-burgundy">
            Featured selection
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,2.8rem)] leading-[0.98] tracking-[-0.03em] text-charcoal">
            <Link href={`/services/${service.id}`} className="transition-colors hover:text-deep-red">
              {service.serviceName}
            </Link>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted line-clamp-3">
            {service.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-warm-taupe/35 pt-5">
            <p className="font-display text-3xl text-charcoal">{formatMoney(service.price)}</p>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <Clock className="size-4" />
              {service.duration} min
            </span>
          </div>
          <Link
            href={`/services/${service.id}`}
            className={buttonStyles({ className: "mt-6 w-fit group/btn" })}
          >
            View details & book
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-warm-taupe/35 bg-soft-ivory transition-all duration-300 hover:-translate-y-1 hover:border-charcoal/15 hover:shadow-elevated">
      <Link
        href={`/services/${service.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-sand"
        aria-label={`View ${service.serviceName}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={service.serviceName}
          loading="lazy"
          onError={() => {
            if (src !== FALLBACK_IMAGE) setSrc(FALLBACK_IMAGE);
          }}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-soft-ivory/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal backdrop-blur-sm">
          {service.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.55rem] leading-[1.05] tracking-[-0.02em] text-charcoal">
            <Link href={`/services/${service.id}`} className="transition-colors hover:text-deep-red">
              {service.serviceName}
            </Link>
          </h3>
          <p className="shrink-0 font-display text-xl text-charcoal">{formatMoney(service.price)}</p>
        </div>
        <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted">
          {service.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-gray">
            <Clock className="size-3.5" />
            {service.duration} min
          </span>
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors group-hover:text-deep-red"
          >
            View & book
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServicesBrowse() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") ?? "";
  const category = CATEGORY_NAMES.includes(urlCategory) ? urlCategory : "";

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const deferredSearch = search.trim();

  const { data, isLoading, isError, isFetching, refetch } = useServices({
    search: deferredSearch || undefined,
    category: category || undefined,
    sort,
    page,
    limit: PAGE_SIZE,
  });

  const services = data?.data ?? [];
  const meta = data?.meta;
  const activeFilters = Boolean(category || deferredSearch || sort !== "newest");
  const [featured, ...rest] = services;

  const chooseCategory = (next: string) => {
    const value = next === "All" ? "" : next;
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("category", value);
    else params.delete("category");
    router.replace(params.size ? `/services?${params.toString()}` : "/services", {
      scroll: false,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSort("newest");
    setPage(1);
    router.replace("/services", { scroll: false });
  };

  return (
    <div className="bg-warm-cream">
      <section className="relative overflow-hidden border-b border-warm-taupe/30 bg-soft-ivory">
        <div
          className="pointer-events-none absolute -right-24 -top-10 h-72 w-72 rounded-full bg-deep-red/10 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative py-16 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-gray">
                Service menu
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.8rem,6.5vw,5rem)] leading-[0.9] tracking-[-0.04em] text-balance text-charcoal">
                Find the treatment for your next{" "}
                <span className="italic text-deep-red">visit.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                Explore active services across hair, nails, skin, massage, makeup and
                barbering. Filter by category, search by name, and compare details at a glance.
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <div className="inline-flex flex-col border-l border-warm-taupe/50 pl-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-gray">
                  Available now
                </p>
                <p className="mt-1 font-display text-[2.6rem] leading-none tracking-[-0.03em] text-charcoal">
                  {meta ? meta.total : "—"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {meta ? (meta.total === 1 ? "service" : "services") : "Loading…"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 lg:py-14">
        <div className="rounded-[22px] border border-warm-taupe/35 bg-soft-neutral/50 p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search by service name"
                className="h-11 w-full rounded-[12px] border border-warm-taupe/45 bg-warm-cream/40 pl-10 pr-10 text-[15px] text-charcoal placeholder:text-muted/70 transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10"
                aria-label="Search services by name"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-[8px] text-muted transition-colors hover:bg-warm-cream hover:text-charcoal"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>

            <div
              className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar xl:pb-0"
              role="tablist"
              aria-label="Service categories"
            >
              {CATEGORIES.map((name) => {
                const active = (name === "All" && !category) || category === name;
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => chooseCategory(name)}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold tracking-[0.01em] transition-all duration-200",
                      active
                        ? "border-deep-red bg-deep-red text-white shadow-[0_10px_24px_-18px_rgba(179,38,30,0.6)]"
                        : "border-warm-taupe/45 bg-warm-cream/30 text-charcoal hover:border-charcoal/30",
                    )}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-medium text-muted" htmlFor="service-sort">
                <SlidersHorizontal className="size-4" />
                Sort
              </label>
              <select
                id="service-sort"
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
                className="h-10 rounded-[11px] border border-warm-taupe/45 bg-warm-cream/35 px-3 text-[13px] text-charcoal transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10"
                aria-label="Sort services"
              >
                {SERVICE_SORTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {activeFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-deep-red underline-offset-4 transition-colors hover:underline"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className={cn("mt-10 transition-opacity", isFetching && !isLoading && "opacity-60")}>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="surface rounded-[20px] px-6 py-16 text-center">
              <p className="font-display text-3xl text-charcoal">We couldn&apos;t load services.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                Check your connection and try again. If the issue continues, the menu will be
                back shortly.
              </p>
              <button type="button" onClick={() => void refetch()} className={buttonStyles({ variant: "outline", className: "mt-5" })}>
                Retry
              </button>
            </div>
          ) : services.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No services match your search"
              description="Try a different category, a shorter service name, or clear your filters to view the full menu."
              action={{ label: "View all services", href: "/services" }}
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
                <div className="sm:col-span-2 lg:col-span-12">
                  <BrowseServiceCard service={featured} featured />
                </div>
                {rest.map((service, index) => (
                  <div
                    key={service.id}
                    className={cn(
                      "lg:col-span-4",
                      index % 5 === 0 && "lg:col-span-5",
                      index % 5 === 1 && "lg:col-span-7",
                    )}
                  >
                    <BrowseServiceCard service={service} />
                  </div>
                ))}
              </div>

              {meta ? (
                <Pagination
                  page={meta.page}
                  totalPages={meta.totalPages}
                  total={meta.total}
                  onChange={(next) => {
                    setPage(next);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}