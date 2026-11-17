import { AuthGuard } from "@/components/dashboard/auth-guard";
import { AdminUsers } from "@/components/admin/admin-users";

export default function AdminUsersPage() {
  return (
    <AuthGuard role="admin">
      <AdminUsers />
    </AuthGuard>
  );
}
