"use client"
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

export default function RemoveChargeDialog() {
  const router = useRouter();
  const { id } = useParams();

  const handleClose = () => router.back();

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Cobrança</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja apagar esse registro de cobrança? Essa ação
            não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} className="flex-1" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"destructive"} className="flex-1">
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
