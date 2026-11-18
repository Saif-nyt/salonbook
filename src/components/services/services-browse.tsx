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
      <section className="border-b border-warm-taupe/40 bg-soft-ivory">
        <div className="container-page py-14 lg:py-18">
          <p className="eyebrow">Browse services</p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-5xl leading-[1.02] text-balance text-charcoal sm:text-6xl">
                Find the right treatment for your next visit.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Explore our active services across hair, nails, skin, massage, makeup and
                barbering. Filter by category, search by name and compare at a glance.
              </p>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {meta
                ? `${meta.total} ${meta.total === 1 ? "service" : "services"}`
                : "Loading services"}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-10 lg:py-12">
        <div className="rounded-lg border border-warm-taupe/50 bg-soft-ivory p-4 shadow-card sm:p-5">
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
                className="h-11 w-full rounded-md border border-warm-taupe/60 bg-warm-cream/40 pl-10 pr-9 text-sm text-charcoal placeholder:text-muted/70 focus:border-deep-red/50 focus:outline-none focus:ring-2 focus:ring-deep-red/15"
                aria-label="Search services by name"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-muted hover:bg-warm-cream hover:text-charcoal"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar xl:pb-0" role="tablist" aria-label="Service categories">
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
                      "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-colors",
                      active
                        ? "border-charcoal bg-charcoal text-white"
                        : "border-warm-taupe/70 bg-transparent text-charcoal hover:border-deep-red/40 hover:text-deep-red",
                    )}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
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
                className="h-10 rounded-md border border-warm-taupe/60 bg-warm-cream/40 px-3 text-xs text-charcoal focus:border-deep-red/50 focus:outline-none"
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
                  className="text-xs font-semibold text-deep-red underline-offset-4 hover:underline"
                >
                  Clear
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
            <div className="surface rounded-lg px-6 py-16 text-center">
              <p className="font-display text-3xl text-charcoal">We couldn&apos;t load services.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                Check your connection and try again. If the issue continues, the menu will
                be back shortly.
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