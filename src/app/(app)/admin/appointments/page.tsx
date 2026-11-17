import { AuthGuard } from "@/components/dashboard/auth-guard";
import { AdminAppointments } from "@/components/admin/admin-appointments";

export default function AdminAppointmentsPage() {
  return (
    <AuthGuard role="admin">
      <AdminAppointments />
    </AuthGuard>
  );
}
