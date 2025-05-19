"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCharges } from "./query/get-all-charges";
import { ChargesTable } from "./components/table/charges-table";
import { ChargePageSkeleton } from "./components/skeletons/page-skeleton";
import { SectionCards } from "./components/section-cards";

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
          <SectionCards classname="basis-1/5"/>
          <section className="w-full basis-4/5">
            <ChargesTable charges={charges || []} />
          </section>
        </div>
      )}
    </main>
  );
}
