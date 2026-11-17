import { AuthGuard } from "@/components/dashboard/auth-guard";
import { CustomerOverview } from "@/components/dashboard/customer-overview";

export default function DashboardPage() {
  return (
    <AuthGuard role="customer">
      <CustomerOverview />
    </AuthGuard>
  );
}
