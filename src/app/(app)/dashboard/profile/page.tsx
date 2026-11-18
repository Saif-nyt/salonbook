import { AuthGuard } from "@/components/dashboard/auth-guard";
import { ProfileSettings } from "@/components/dashboard/customer-profile";

export default function DashboardProfilePage() {
  return (
    <AuthGuard role="customer">
      <ProfileSettings role="customer" />
    </AuthGuard>
  );
}
