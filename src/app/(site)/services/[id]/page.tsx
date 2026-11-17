import { Suspense } from "react";
import { ServiceDetail } from "@/components/services/service-detail";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-12">
          <Skeleton className="h-4 w-40" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
        </div>
      }
    >
      <ServiceDetail />
    </Suspense>
  );
}
