import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Service } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-soft">
      <Link
        href={`/services/${service.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-sand"
        aria-label={`View ${service.serviceName}`}
      >
        {/* Service images may be uploaded to any host, so native img keeps them flexible. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.serviceName}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft backdrop-blur-sm">
          {service.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.55rem] leading-tight text-ink">
            <Link href={`/services/${service.id}`} className="hover:text-terracotta">
              {service.serviceName}
            </Link>
          </h3>
          <p className="shrink-0 font-display text-xl text-terracotta">
            {formatMoney(service.price)}
          </p>
        </div>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {service.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="size-3.5" />
            {service.duration} min
          </span>
          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-terracotta"
          >
            View details
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
