import { Suspense } from "react";
import { AuthGuard } from "@/components/dashboard/auth-guard";
import { CustomerAppointmentDetail } from "@/components/dashboard/customer-appointment-detail";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardAppointmentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-12">
          <Skeleton className="h-8 w-52" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Skeleton className="h-96 rounded-lg" />
            <Skeleton className="h-96 rounded-lg" />
          </div>
        </div>
      }
    >
      <AuthGuard role="customer">
        <CustomerAppointmentDetail />
      </AuthGuard>
    </Suspense>
  );
}
