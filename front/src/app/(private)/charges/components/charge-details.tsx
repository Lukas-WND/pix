import { Button } from "@/components/ui/button";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { SimulatePaymentButton } from "./simulate-payment";

interface ViewChargeDetails {
  id: string;
  status: number;
  qr_code: string;
  br_code: string;
}

export function ChargeDetails({
  charge,
  isLoading,
  setOpen,
}: {
  charge: ViewChargeDetails;
  isLoading: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [copied, setCopied] = useState(false);

  const copy_code = async () => {
    try {
      await navigator.clipboard.writeText(charge.br_code);
      setCopied(true);
      toast.success("Código copiado com sucesso!");

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Erro ao copiar código");
    }
  };

  return isLoading ? (
    "carregando.."
  ) : (
    <div className="w-full">
      <img
        className="object-cover object-center w-full"
        src={charge.qr_code}
        alt="qr code para pagamento"
      />
      <div className="flex flex-col gap-2">
        <p className="break-all w-full p-2 border rounded-2xl">
          {charge.br_code}
        </p>
        <Button
          className="flex gap-2 w-full bg-emerald-600"
          onClick={copy_code}
        >
          {copied ? (
            <>
              <CheckIcon size={3} />
              copiado!
            </>
          ) : (
            <>
              <ClipboardIcon size={3} />
              Copiar código
            </>
          )}
        </Button>
      </div>
      <div className="mt-4 w-full flex gap-4">
        <Button
          variant={"outline"}
          className="flex-1"
          onClick={() => setOpen(false)}
        >
          Fechar
        </Button>
        <SimulatePaymentButton chargeId={charge.id} />
      </div>
    </div>
  );
}
