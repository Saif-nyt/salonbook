import { AuthGuard } from "@/components/dashboard/auth-guard";
import { PaymentCancel } from "@/components/dashboard/payment-cancel";

export default function PaymentCancelPage() {
  return (
    <AuthGuard role="customer">
      <PaymentCancel />
    </AuthGuard>
  );
}
