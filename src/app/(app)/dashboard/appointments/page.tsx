import { AuthGuard } from "@/components/dashboard/auth-guard";
import { CustomerAppointments } from "@/components/dashboard/customer-appointments";

export default function DashboardAppointmentsPage() {
  return (
    <AuthGuard role="customer">
      <CustomerAppointments />
    </AuthGuard>
  );
}
