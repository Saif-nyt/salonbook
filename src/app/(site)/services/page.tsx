import { Suspense } from "react";
import { ServicesBrowse } from "@/components/services/services-browse";
import { CardSkeleton } from "@/components/ui/skeleton";

function BrowseFallback() {
  return (
    <div className="bg-warm-cream">
      <div className="container-page py-14 lg:py-18">
        <div className="h-4 w-32 rounded bg-sand" />
        <div className="mt-5 h-14 w-full max-w-xl rounded bg-sand" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<BrowseFallback />}>
      <ServicesBrowse />
    </Suspense>
  );
}
