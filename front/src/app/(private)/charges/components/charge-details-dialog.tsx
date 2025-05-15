"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { getChargeDetails } from "../query/get-charge-details";
import { ChargeDetails } from "./charge-details";
import { SimulatePaymentButton } from "./simulate-payment";

export default function ChargeDetailsDialog({
  chargeId,
}: {
  chargeId: string;
}) {
  const [open, setOpen] = useState(false);

  const { data: charge, isLoading } = useQuery({
    queryKey: ["charge-details"],
    queryFn: () => getChargeDetails(chargeId),
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute top-0 right-4"
          variant={"outline"}
          size={"icon"}
        >
          <EyeIcon size={4} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Cobrança</DialogTitle>
          <DialogDescription>
            Veja abaixo os detalhes da cobrança:
          </DialogDescription>
        </DialogHeader>
        <ChargeDetails
          charge={charge}
          isLoading={isLoading}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
