"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Service } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80";

export function ServiceCard({ service }: { service: Service }) {
  const [src, setSrc] = useState(service.image || FALLBACK_IMAGE);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-warm-taupe/40 bg-soft-ivory transition-all duration-300 hover:-translate-y-1 hover:border-charcoal/15 hover:shadow-elevated">
      <Link
        href={`/services/${service.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-warm-cream"
        aria-label={`View ${service.serviceName}`}
      >
        {/* Service images may be uploaded to any host, so native img keeps them flexible. */}
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-soft-ivory/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal shadow-sm backdrop-blur-sm">
          {service.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.55rem] leading-[1.1] text-charcoal sm:text-[1.7rem]">
            <Link
              href={`/services/${service.id}`}
              className="transition-colors duration-200 hover:text-deep-red"
            >
              {service.serviceName}
            </Link>
          </h3>
          <p className="shrink-0 rounded-full bg-warm-cream/70 px-3 py-1 font-display text-lg text-charcoal ring-1 ring-warm-taupe/30">
            {formatMoney(service.price)}
          </p>
        </div>

        <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted">
          {service.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-warm-taupe/35 bg-warm-cream/50 px-3 py-1.5 text-xs font-medium text-muted">
            <Clock className="size-3.5" />
            {service.duration} min
          </span>
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors group-hover:text-deep-red"
          >
            View Details
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}