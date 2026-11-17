import { AuthGuard } from "@/components/dashboard/auth-guard";
import { PaymentSuccess } from "@/components/dashboard/payment-result";

export default function PaymentSuccessPage() {
  return (
    <AuthGuard role="customer">
      <PaymentSuccess />
    </AuthGuard>
  );
}
