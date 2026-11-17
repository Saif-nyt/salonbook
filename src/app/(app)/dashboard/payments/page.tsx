import { AuthGuard } from "@/components/dashboard/auth-guard";
import { CustomerPayments } from "@/components/dashboard/customer-payments";

export default function DashboardPaymentsPage() {
  return (
    <AuthGuard role="customer">
      <CustomerPayments />
    </AuthGuard>
  );
}
