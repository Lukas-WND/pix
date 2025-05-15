import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ViewCharge } from "../query/get-all-charges";
import { ChargeStatus } from "./charge-status";

const Type = ["Estático", "Dinâmico"];

export function ChargesCard({ charge }: { charge: ViewCharge }) {
  return (
    <Card className="w-full bg-slate-50">
      <CardHeader>
        <CardTitle>{charge.description}</CardTitle>
        <CardDescription className="text-sm">{charge.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-4 justify-between">
          <p className="text-start">
            {(charge.amount / 100).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <ChargeStatus status={charge.status} />
          <p className="text-center">{Type[charge.type]}</p>
          <p className="text-end">
            {charge.due_date?.toLocaleDateString("pt-br")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
