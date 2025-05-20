import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleDollarSignIcon,
  InfoIcon,
  MoreHorizontal,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { Charge } from "../../interfaces/charge.interface";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Actions({ charge }: { charge: Charge }) {
  const [activeDialog, setActiveDialog] = useState<
    null | "view" | "delete" | "payment"
  >(null);

  const router = useRouter();

  return (
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

        <Link href={`/charges/${charge.id}/view`}>
          <DropdownMenuItem className="gap-2 items-center">
            <InfoIcon className="size-4" />
            <p>Ver detalhes</p>
          </DropdownMenuItem>
        </Link>

        <Link href={`/charges/${charge.id}/remove`}>
          <DropdownMenuItem className="gap-2 items-center">
            <Trash2Icon className="size-4" />
            <p>Deletar</p>
          </DropdownMenuItem>
        </Link>

        <Link href={`/charges/${charge.id}/simulate-payment`}>
          <DropdownMenuItem className="gap-2 items-center">
            <CircleDollarSignIcon className="size-4" />
            <p>Simular Pagamento</p>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
