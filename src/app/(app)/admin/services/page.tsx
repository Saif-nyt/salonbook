import { AuthGuard } from "@/components/dashboard/auth-guard";
import { AdminServices } from "@/components/admin/admin-services";

export default function AdminServicesPage() {
  return (
    <AuthGuard role="admin">
      <AdminServices />
    </AuthGuard>
  );
}
