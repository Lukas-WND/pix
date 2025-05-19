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
          <DialogTitle>Detalhes da Cobrança</DialogTitle>
          <DialogDescription>do id: {id}</DialogDescription>
        </DialogHeader>
        <div></div>
        <DialogFooter className="mt-6">
          <Button variant={"outline"} className="w-full" onClick={handleClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
