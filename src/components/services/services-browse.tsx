"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, SearchX } from "lucide-react";
import { useServices } from "@/lib/queries";
import { CATEGORY_NAMES, SERVICE_SORTS } from "@/lib/constants";
import { ServiceCard } from "@/components/services/service-card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;
const CATEGORIES = ["All", ...CATEGORY_NAMES];

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
      <section className="relative overflow-hidden border-b border-warm-taupe/35 bg-soft-ivory">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-deep-red/10 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative py-14 lg:py-20">
          <p className="eyebrow">Browse services</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.98] text-balance text-charcoal">
                Find the right treatment for your next <span className="italic">visit</span>.
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                Explore active services across hair, nails, skin, massage, makeup and
                barbering. Filter by category, search by name, and compare details at a glance.
              </p>
            </div>
            <div className="rounded-[16px] border border-warm-taupe/35 bg-warm-cream/50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Available now
              </p>
              <p className="mt-1 font-display text-2xl text-charcoal">
                {meta ? `${meta.total} ${meta.total === 1 ? "service" : "services"}` : "Loading…"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 lg:py-12">
        <div className="rounded-[20px] border border-warm-taupe/40 bg-soft-ivory p-4 shadow-card sm:p-5">
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
                className="h-11 w-full rounded-[12px] border border-warm-taupe/55 bg-warm-cream/35 pl-10 pr-10 text-[15px] text-charcoal placeholder:text-muted/70 transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10"
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
                        ? "border-charcoal bg-charcoal text-white shadow-[0_10px_24px_-18px_rgba(28,28,28,0.7)]"
                        : "border-warm-taupe/50 bg-warm-cream/30 text-charcoal hover:border-deep-red/30 hover:text-deep-red",
                    )}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label
                className="flex items-center gap-2 text-xs font-medium text-muted"
                htmlFor="service-sort"
              >
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
                className="h-10 rounded-[11px] border border-warm-taupe/55 bg-warm-cream/35 px-3 text-[13px] text-charcoal transition-colors focus:border-deep-red/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-deep-red/10"
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

        <div
          className={cn(
            "mt-8 transition-opacity",
            isFetching && !isLoading && "opacity-60",
          )}
        >
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
              <button
                type="button"
                onClick={() => void refetch()}
                className={buttonStyles({ variant: "outline", className: "mt-5" })}
              >
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
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
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