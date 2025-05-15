import { useMutation } from "@tanstack/react-query";
import { simulatePayment } from "../query/simulate-payment-mutation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import React, { SetStateAction } from "react";

export function SimulatePaymentButton({
  chargeId,
  setOpen,
}: {
  chargeId: string;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const simulate_payment_mutation = useMutation({
    mutationKey: ["simulate-payment"],
    mutationFn: simulatePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charges"] });
      toast.success("Pagamento realizado com sucesso!");
      setOpen(false);
    },
    onError: () => {
      toast.error("Erro ao tentar realizar pagamento.");
    },
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
