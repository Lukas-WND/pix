import { Skeleton } from "@/components/ui/skeleton";

export function DetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className="aspect-square" />
      <Skeleton className="h-28" />
      <Skeleton className="h-10" />
    </div>
  );
}
