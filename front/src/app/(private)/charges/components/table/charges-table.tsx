import DataTable from "@/components/ui/data-table";
import { columns } from "./charge-columns";
import { Charge } from "../../interfaces/charge.interface";

export function ChargesTable({ charges }: { charges: Charge[] }) {
  return <DataTable columns={columns} data={charges} />;
}
