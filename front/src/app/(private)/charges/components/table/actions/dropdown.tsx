import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Charge } from "../../interfaces/charge.interface";

export default function Actions({ charge }: { charge: Charge }) {
  const [dialogComponent, setDialogComponent] = useState(<></>);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger className="w-full">
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
                setDialogComponent(<></>);
              }}
            >
              <span>
                <Pencil className="size-4 mr-2" />
              </span>
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
                setDialogComponent(<></>);
              }}
            >
              <span>
                <Trash2 className="size-4 mr-2" />
              </span>
              <span>Deletar</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>{dialogComponent}</DialogContent>
    </Dialog>
  );
}
