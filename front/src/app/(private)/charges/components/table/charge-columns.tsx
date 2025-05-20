import { ColumnDef } from "@tanstack/react-table";
import { Charge } from "../../interfaces/charge.interface";
import Actions from "./dropdown-actions";

export const columns: ColumnDef<Charge>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
    header: "Valor (R$)",
    cell: ({ row }) => {
      const amount = row.original.amount;

      return (amount / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      if (status === 0) {
        return (
          <div className="text-amber-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
            Pendente
          </div>
        );
      }

      if (status === 1) {
        return (
          <div className="text-rose-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
            Expirado
          </div>
        );
      }

      if (status === 2) {
        return (
          <div className="text-emerald-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            Pago
          </div>
        );
      }

      if (status === 3) {
        return (
          <div className="text-sky-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-600 inline-block" />
            Creditado
          </div>
        );
      }
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.original.type;

      if (type === 0) {
        return "Estático";
      }

      if (type === 1) {
        return "Dinâmico";
      }
    },
  },
  {
    accessorKey: "due_date",
    header: "Vencimento",
    cell: ({ row }) => {
      const due_date = row.original.due_date;

      return due_date
        ? new Date(due_date).toLocaleDateString("pt-br")
        : undefined;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const charge = row.original;

      return <Actions charge={charge} />;
    },
  },
];
