import { AuthGuard } from "@/components/dashboard/auth-guard";
import { ProfileSettings } from "@/components/dashboard/customer-profile";

export default function AdminProfilePage() {
  return (
    <AuthGuard role="admin">
      <ProfileSettings role="admin" />
    </AuthGuard>
  );
}
