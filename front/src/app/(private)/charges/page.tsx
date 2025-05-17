"use client";

import { useQuery } from "@tanstack/react-query";
import { ChargesList } from "./components/charges-list";
import { CreateChargeDialog } from "./components/create-charge-dialog";
import { getAllCharges } from "./query/get-all-charges";
import { ChargesTable } from "./components/table/charges-table";
import { ChargePageSkeleton } from "./components/skeletons/page-skeleton";

export default function ChargesPage() {
  const { data: charges, isLoading } = useQuery({
    queryKey: ["charges"],
    queryFn: getAllCharges,
  });

  return (
    <main className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
      {isLoading ? (
        <ChargePageSkeleton />
      ) : (
        <div className="p-4 flex flex-col gap-6 h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 basis-1/5">
            <section className="bg-red-300 w-full"></section>
            <section className="bg-red-300 w-full"></section>
            <section className="bg-red-300 w-full"></section>
          </div>
          <section className="w-full basis-4/5">
            <ChargesTable charges={charges || []} />
          </section>
        </div>
      )}
    </main>
  );
}
