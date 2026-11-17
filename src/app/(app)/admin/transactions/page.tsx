import { AuthGuard } from "@/components/dashboard/auth-guard";
import { AdminTransactions } from "@/components/admin/admin-transactions";

export default function AdminTransactionsPage() {
  return (
    <AuthGuard role="admin">
      <AdminTransactions />
    </AuthGuard>
  );
}
