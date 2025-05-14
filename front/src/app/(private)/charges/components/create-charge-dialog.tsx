"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import { CreateChargeForm } from "./create-charge-form";
import { useState } from "react";

export function CreateChargeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-3">
          <PlusCircleIcon size={4} /> <span>Nova Cobrança</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Cobrança</DialogTitle>
          <DialogDescription>
            Gere cobranças via pix preenchendo os dados abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <CreateChargeForm setOpen={setOpen}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
