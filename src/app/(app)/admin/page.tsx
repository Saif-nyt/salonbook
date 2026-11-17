import { AuthGuard } from "@/components/dashboard/auth-guard";
import { AdminOverview } from "@/components/admin/admin-overview";

export default function AdminPage() {
  return (
    <AuthGuard role="admin">
      <AdminOverview />
    </AuthGuard>
  );
}
