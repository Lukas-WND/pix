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
import { getChargeDetails } from "../../../query/get-charge-details";
import { useQuery } from "@tanstack/react-query";
import { DetailsSkeleton } from "../../../components/skeletons/details-skeleton";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useCopyToClipboard } from "@/lib/copy-to-clipboard";

export default function ViewChargeDialog() {
  const { id }: { id: string } = useParams();

  const router = useRouter();

  const { data: charge, isLoading } = useQuery({
    queryKey: ["charge-details"],
    queryFn: () => getChargeDetails(id),
    enabled: !!id,
  });

  const handleClose = () => router.back();

  const { copy, copied } = useCopyToClipboard(charge?.brcode);

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Cobrança</DialogTitle>
          <DialogDescription>
            Confira abaixo as informações pra pagamento da cobrança
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <DetailsSkeleton />
        ) : (
          <div>
            <img
              className="object-cover object-center w-full rounded-2xl"
              src={charge?.qrcode}
              alt="qr code para pagamento"
            />
            <div className="flex flex-col gap-2 mt-2">
              <p className="break-all w-full p-2 border rounded-2xl">
                {charge?.brcode}
              </p>
              <Button className="mt-4 flex gap-2 w-full" onClick={copy}>
                {copied ? (
                  <>
                    <CheckIcon size={3} />
                    Copiado!
                  </>
                ) : (
                  <>
                    <ClipboardIcon size={3} />
                    Copiar código
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant={"outline"} className="w-full" onClick={handleClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
