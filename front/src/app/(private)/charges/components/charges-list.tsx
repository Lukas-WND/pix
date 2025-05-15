"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCharges } from "../query/get-all-charges";

export function ChargesList() {
  const charges = useQuery({
    queryKey: ["all-charges"],
    queryFn: getAllCharges,
  });

  const { data } = charges;

  return (
    <div>
      {data?.map((item: any, idx: number) => (
        <p key={idx}>{item.id}</p>
      ))}
    </div>
  );
}
