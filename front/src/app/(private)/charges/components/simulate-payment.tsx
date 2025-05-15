import { useMutation } from "@tanstack/react-query";
import { simulatePayment } from "../query/simulate-payment-mutation";
import { Button } from "@/components/ui/button";

export function SimulatePaymentButton({ chargeId }: { chargeId: string }) {
  const simulate_payment_mutation = useMutation({
    mutationKey: ["simulate-payment"],
    mutationFn: simulatePayment,
  });

  const handleSimulatePayment = () => {
    simulate_payment_mutation.mutate({ id: chargeId });
  };

  return (
    <Button
      className="flex-1"
      onClick={handleSimulatePayment}
      disabled={simulate_payment_mutation.isPending}
    >
      Simular Pagamento
    </Button>
  );
}
