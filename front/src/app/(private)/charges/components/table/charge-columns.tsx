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
        return "Pendente";
      }

      if (status === 1) {
        return "Expirado";
      }

      if (status === 2) {
        return "Pago";
      }

      if (status === 3) {
        return "Creditado";
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
