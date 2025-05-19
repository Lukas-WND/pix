"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";

export default function ViewChargeDialog() {
  const router = useRouter();
  const { id } = useParams();

  const handleClose = () => router.back();

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simular pagamento</DialogTitle>
          <DialogDescription>
            Esta ação realiza uma simualação de pagamento da cobrança
            selecionada, deseja continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 gap-2 w-full">
          <Button variant={"outline"} className="flex-1" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="flex-1">Simular</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
