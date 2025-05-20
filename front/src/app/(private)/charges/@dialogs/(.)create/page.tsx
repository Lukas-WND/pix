"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { CreateChargeForm } from "../../components/create-charge-form";
// import { CreateChargeForm } from "../../components/create-charge-form";

export default function CreateChargeDialog() {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Cobrança</DialogTitle>
          <DialogDescription>
            Gere cobranças via pix preenchendo os dados abaixo.
          </DialogDescription>
        </DialogHeader>

        <CreateChargeForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
