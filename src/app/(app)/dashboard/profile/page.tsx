import { AuthGuard } from "@/components/dashboard/auth-guard";
import { CustomerProfile } from "@/components/dashboard/customer-profile";

export default function DashboardProfilePage() {
  return (
    <AuthGuard role="customer">
      <CustomerProfile />
    </AuthGuard>
  );
}
