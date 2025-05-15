"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCharges } from "../query/get-all-charges";
import { ChargesCard } from "./charge-card";

export function ChargesList() {
  const charges = useQuery({
    queryKey: ["all-charges"],
    queryFn: getAllCharges,
  });

  const { data } = charges;

  return (
    <div className="grid gap-4">
      {data?.map((item, idx: number) => {
        const due_date = item.due_date ? new Date(item.due_date) : undefined;
        item.due_date = due_date;
        return <ChargesCard key={idx} charge={item} />;
      })}
    </div>
  );
}
