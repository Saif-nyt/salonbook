"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Sparkles,
  Tag,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useService, useServices } from "@/lib/queries";
import { formatMoney } from "@/lib/utils";
import { BookingForm } from "@/components/services/booking-form";
import { ServiceCard } from "@/components/services/service-card";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonStyles } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=85";

export function ServiceDetail() {
  const params = useParams<{ id: string }>();
  const id = typeof params.id === "string" ? params.id : undefined;
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, isError, error } = useService(id);
  const service = data?.data;
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading || user) return;
    router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
  }, [isAuthLoading, user, router, pathname]);

  const related = useServices({
    category: service?.category,
    limit: 4,
    sort: "newest",
  });

  if (isAuthLoading || !user) {
    return (
      <div className="container-page py-10 lg:py-14">
        <Skeleton className="h-4 w-48" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div className="space-y-6">
            <Skeleton className="aspect-[4/3] w-full rounded-[24px]" />
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-[34rem] w-full rounded-[20px]" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container-page py-10 lg:py-14">
        <Skeleton className="h-4 w-48" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div className="space-y-6">
            <Skeleton className="aspect-[4/3] w-full rounded-[24px]" />
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-[34rem] w-full rounded-[20px]" />
        </div>
      </div>
    );
  }

  if (isError || !service) {
    const message =
      error instanceof Error ? error.message : "This service could not be found.";
    return (
      <div className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-xl rounded-[24px] border border-warm-taupe/40 bg-soft-ivory p-8 text-center shadow-card sm:p-12">
          <p className="eyebrow">Service unavailable</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] leading-[1.02] text-charcoal">
            We couldn&apos;t find that service.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">{message}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/services" className={buttonStyles()}>
              Browse services
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/" className={buttonStyles({ variant: "outline" })}>
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedServices = (related.data?.data ?? [])
    .filter((item) => item.id !== service.id)
    .slice(0, 3);
  const heroImage = imageSrc ?? service.image ?? FALLBACK_IMAGE;

  return (
    <div className="bg-warm-cream">
      <div className="container-page pb-16 pt-8 lg:pb-24 lg:pt-10">
        <nav
          className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-charcoal">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/services" className="transition-colors hover:text-charcoal">
            Services
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate text-charcoal">{service.serviceName}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 xl:gap-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-sand shadow-elevated ring-1 ring-warm-taupe/25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={service.serviceName}
                onError={() => {
                  if (heroImage !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE);
                }}
                className="size-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/15 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <Badge
                  tone="neutral"
                  className="border-white/50 bg-soft-ivory/95 text-charcoal shadow-sm backdrop-blur-sm"
                >
                  {service.category}
                </Badge>
                {service.status === "inactive" ? (
                  <Badge tone="muted" className="bg-soft-ivory/95 backdrop-blur-sm">
                    Currently unavailable
                  </Badge>
                ) : null}
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="eyebrow">{service.category}</p>
              <h1 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,3.8rem)] leading-[0.98] text-balance text-charcoal">
                {service.serviceName}
              </h1>

              <div className="mt-7 grid gap-4 rounded-[20px] border border-warm-taupe/40 bg-soft-ivory/80 p-4 shadow-card sm:grid-cols-3 sm:gap-0 sm:p-5">
                <div className="sm:px-4 sm:py-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Price
                  </p>
                  <p className="mt-1 font-display text-3xl leading-none text-charcoal">
                    {formatMoney(service.price)}
                  </p>
                </div>
                <div className="border-t border-warm-taupe/35 pt-4 sm:border-l sm:border-t-0 sm:px-4 sm:pt-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Duration
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-display text-3xl leading-none text-charcoal">
                    <Clock className="size-4 text-muted" />
                    {service.duration} min
                  </p>
                </div>
                <div className="border-t border-warm-taupe/35 pt-4 sm:border-l sm:border-t-0 sm:px-4 sm:pt-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Booking
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-display text-3xl leading-none text-charcoal">
                    <CalendarDays className="size-4 text-muted" />
                    Request
                  </p>
                </div>
              </div>

              <div className="prose-salon mt-8 max-w-2xl">
                <h2 className="font-display text-3xl leading-tight text-charcoal">
                  About this service
                </h2>
                <p className="mt-3 text-[15px] leading-[1.9] text-muted sm:text-base">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[18px] border border-warm-taupe/40 bg-soft-ivory p-5 shadow-card">
                  <span className="grid size-10 place-items-center rounded-[12px] bg-warm-cream text-deep-red ring-1 ring-warm-taupe/35">
                    <Tag className="size-4" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-charcoal">What to expect</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    A consultation-led treatment delivered with care, clarity and attention to
                    detail.
                  </p>
                </div>
                <div className="rounded-[18px] border border-warm-taupe/40 bg-soft-ivory p-5 shadow-card">
                  <span className="grid size-10 place-items-center rounded-[12px] bg-warm-cream text-deep-red ring-1 ring-warm-taupe/35">
                    <Sparkles className="size-4" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-charcoal">Good to know</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    Arrive a few minutes early. Pending requests can be managed from your
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <BookingForm service={service} />
            <Link
              href="/services"
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-deep-red"
            >
              <ArrowLeft className="size-3.5" />
              Back to all services
            </Link>
          </div>
        </div>

        {relatedServices.length > 0 ? (
          <div className="mt-20 border-t border-warm-taupe/35 pt-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Continue exploring</p>
                <h2 className="mt-2 font-display text-[clamp(2rem,4vw,2.6rem)] leading-tight text-charcoal">
                  More in <span className="italic">{service.category}</span>
                </h2>
              </div>
              <Link
                href={`/services?category=${encodeURIComponent(service.category)}`}
                className={buttonStyles({ variant: "outline", size: "sm" })}
              >
                See all
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((item) => (
                <ServiceCard key={item.id} service={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}