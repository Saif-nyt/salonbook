"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Sparkles,
  Tag,
} from "lucide-react";
import { useService, useServices } from "@/lib/queries";
import { formatMoney } from "@/lib/utils";
import { BookingForm } from "@/components/services/booking-form";
import { ServiceCard } from "@/components/services/service-card";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonStyles } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ServiceDetail() {
  const params = useParams<{ id: string }>();
  const id = typeof params.id === "string" ? params.id : undefined;
  const { data, isLoading, isError, error } = useService(id);
  const service = data?.data;

  const related = useServices({
    category: service?.category,
    limit: 4,
    sort: "newest",
  });

  if (isLoading) {
    return (
      <div className="container-page py-12">
        <Skeleton className="h-4 w-48" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-[32rem] w-full rounded-lg" />
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
          <p className="eyebrow">Not found</p>
          <h1 className="mt-3 font-display text-5xl text-ink">This treatment has moved.</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{message}</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/services" className={buttonStyles()}>
              Browse the menu
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

  const relatedServices = (related.data?.data ?? []).filter(
    (item) => item.id !== service.id,
  ).slice(0, 3);

  return (
    <div className="bg-ivory">
      <div className="container-page pt-8 pb-16 lg:pb-24">
        <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate text-ink-soft">{service.serviceName}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.serviceName}
                className="size-full object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge tone="accent" className="bg-cream/94 backdrop-blur-sm">
                  {service.category}
                </Badge>
                {service.status === "inactive" ? (
                  <Badge tone="muted" className="bg-cream/94 backdrop-blur-sm">
                    Currently unavailable
                  </Badge>
                ) : null}
              </div>
            </div>

            <div className="mt-9">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">{service.category}</p>
                <span className="h-1 w-1 rounded-full bg-line" aria-hidden />
                <p className="text-xs text-muted">SalonBook signature menu</p>
              </div>
              <h1 className="mt-3 font-display text-5xl leading-[1.02] text-balance text-ink sm:text-6xl">
                {service.serviceName}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-6 border-y border-line py-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Price
                  </p>
                  <p className="mt-1 font-display text-2xl text-terracotta">
                    {formatMoney(service.price)}
                  </p>
                </div>
                <div className="h-9 w-px bg-line" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Duration
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-display text-2xl text-ink">
                    <Clock className="size-4 text-muted" />
                    {service.duration} min
                  </p>
                </div>
                <div className="h-9 w-px bg-line" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Booking
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-display text-2xl text-ink">
                    <CalendarDays className="size-4 text-muted" />
                    Request a time
                  </p>
                </div>
              </div>

              <div className="prose-salon mt-7 max-w-2xl">
                <h2 className="font-display text-3xl text-ink">The treatment</h2>
                <p className="mt-3 text-[15px] leading-[1.85]">{service.description}</p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-line bg-cream p-5">
                  <Tag className="size-4 text-terracotta" />
                  <p className="mt-3 text-sm font-semibold text-ink">What&apos;s included</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    Consultation, treatment and a short aftercare conversation with your
                    specialist.
                  </p>
                </div>
                <div className="rounded-md border border-line bg-cream p-5">
                  <Sparkles className="size-4 text-terracotta" />
                  <p className="mt-3 text-sm font-semibold text-ink">Good to know</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    Arrive five minutes early. Reschedule or cancel pending requests from
                    your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <BookingForm service={service} />
            <Link
              href="/services"
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-terracotta"
            >
              <ArrowLeft className="size-3.5" />
              Back to all services
            </Link>
          </div>
        </div>

        {relatedServices.length > 0 ? (
          <div className="mt-20 border-t border-line pt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Continue exploring</p>
                <h2 className="mt-2 font-display text-4xl text-ink">
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
