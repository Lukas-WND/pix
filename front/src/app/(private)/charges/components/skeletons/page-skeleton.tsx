import { Skeleton } from "@/components/ui/skeleton";

export function ChargePageSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-6 h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 basis-1/5">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton className="w-full basis-4/5" />
    </div>
  );
}
