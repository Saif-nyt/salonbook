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
      <div className="container-page py-12">
        <Skeleton className="h-4 w-48" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-[34rem] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container-page py-12">
        <Skeleton className="h-4 w-48" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-[34rem] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (isError || !service) {
    const message =
      error instanceof Error ? error.message : "This service could not be found.";
    return (
      <div className="container-page py-24">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow">Service unavailable</p>
          <h1 className="mt-3 font-display text-5xl text-charcoal">
            We couldn&apos;t find that service.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{message}</p>
          <div className="mt-8 flex justify-center gap-3">
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
      <div className="container-page pt-8 pb-16 lg:pb-24">
        <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
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

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={service.serviceName}
                onError={() => {
                  if (heroImage !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE);
                }}
                className="size-full object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge
                  tone="neutral"
                  className="border-white/40 bg-soft-ivory/95 text-charcoal backdrop-blur-sm"
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

            <div className="mt-9">
              <p className="eyebrow">{service.category}</p>
              <h1 className="mt-3 font-display text-5xl leading-[1.02] text-balance text-charcoal sm:text-6xl">
                {service.serviceName}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-6 border-y border-warm-taupe/50 py-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Price
                  </p>
                  <p className="mt-1 font-display text-3xl text-charcoal">
                    {formatMoney(service.price)}
                  </p>
                </div>
                <div className="h-10 w-px bg-warm-taupe/50" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Duration
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-display text-3xl text-charcoal">
                    <Clock className="size-4 text-muted" />
                    {service.duration} min
                  </p>
                </div>
                <div className="h-10 w-px bg-warm-taupe/50" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Booking
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-display text-3xl text-charcoal">
                    <CalendarDays className="size-4 text-muted" />
                    Request
                  </p>
                </div>
              </div>

              <div className="prose-salon mt-8 max-w-2xl">
                <h2 className="font-display text-3xl text-charcoal">About this service</h2>
                <p className="mt-3 text-[15px] leading-[1.85] text-muted">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-warm-taupe/50 bg-soft-ivory p-5">
                  <Tag className="size-4 text-deep-red" />
                  <p className="mt-3 text-sm font-semibold text-charcoal">What to expect</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    A consultation-led treatment delivered with care, clarity and attention
                    to detail.
                  </p>
                </div>
                <div className="rounded-md border border-warm-taupe/50 bg-soft-ivory p-5">
                  <Sparkles className="size-4 text-deep-red" />
                  <p className="mt-3 text-sm font-semibold text-charcoal">Good to know</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
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
          <div className="mt-20 border-t border-warm-taupe/40 pt-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Continue exploring</p>
                <h2 className="mt-2 font-display text-4xl text-charcoal">
                  More in {service.category}
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