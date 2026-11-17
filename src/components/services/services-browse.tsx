"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useServices } from "@/lib/queries";
import { CATEGORY_NAMES, SERVICE_SORTS } from "@/lib/constants";
import { ServiceCard } from "@/components/services/service-card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

const PAGE_SIZE = 9;

export function ServicesBrowse() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";

  const [category, setCategory] = useState(
    CATEGORY_NAMES.includes(initialCategory) ? initialCategory : "",
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const deferredSearch = useMemo(() => search.trim(), [search]);

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
    setCategory(next);
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set("category", next);
    else params.delete("category");
    router.replace(params.size ? `/services?${params.toString()}` : "/services", {
      scroll: false,
    });
  };

  const clearFilters = () => {
    setCategory("");
    setSearch("");
    setSort("newest");
    setPage(1);
    router.replace("/services", { scroll: false });
  };

  const goToPage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-ivory">
      <section className="border-b border-line/70 bg-cream">
        <div className="container-page py-14 lg:py-18">
          <p className="eyebrow">The treatment menu</p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-2xl font-display text-5xl leading-[1.02] text-balance text-ink sm:text-6xl">
                Find the care you came for.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                Browse every treatment currently available at SalonBook. Filter by
                category, search by name, and open any service to request a time.
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {meta ? `${meta.total} ${meta.total === 1 ? "treatment" : "treatments"}` : "Loading treatments"}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-10 lg:py-12">
        <div className="rounded-lg border border-line bg-cream p-4 shadow-[0_18px_50px_-40px_rgba(59,42,30,0.5)] sm:p-5">
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
                className="h-11 w-full rounded-md border border-line bg-ivory/60 pl-10 pr-9 text-sm text-ink placeholder:text-muted/70 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/15"
                aria-label="Search services by name"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar xl:pb-0">
              <button
                type="button"
                onClick={() => chooseCategory("")}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                  category === ""
                    ? "border-ink bg-ink text-cream"
                    : "border-line bg-transparent text-ink-soft hover:border-terracotta/40 hover:text-terracotta",
                )}
              >
                All
              </button>
              {CATEGORY_NAMES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => chooseCategory(name)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                    category === name
                      ? "border-ink bg-ink text-cream"
                      : "border-line bg-transparent text-ink-soft hover:border-terracotta/40 hover:text-terracotta",
                  )}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <SlidersHorizontal className="size-4 text-muted" />
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
                className="h-10 rounded-md border border-line bg-ivory/60 px-3 text-xs text-ink focus:border-terracotta focus:outline-none"
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
                  className="text-xs font-medium text-terracotta underline-offset-4 hover:underline"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className={cn("mt-8 transition-opacity", isFetching && !isLoading && "opacity-60")}>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="surface rounded-lg px-6 py-16 text-center">
              <p className="font-display text-3xl text-ink">We lost the thread.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                The service list could not be loaded. Check your connection and try
                again.
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
              title="No treatments match"
              description="Try a different category or a shorter search term. Our full menu is only a clear away."
              action={{ label: "View all services", href: "/services" }}
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {meta && meta.totalPages > 1 ? (
                <div className="mt-12 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    className={buttonStyles({
                      variant: "outline",
                      size: "sm",
                      className: "disabled:opacity-40",
                    })}
                  >
                    Previous
                  </button>
                  <span className="text-xs text-muted">
                    Page {meta.page} of {meta.totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= meta.totalPages}
                    className={buttonStyles({
                      variant: "outline",
                      size: "sm",
                      className: "disabled:opacity-40",
                    })}
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
