import { Skeleton } from "../ui/skeleton";

export default function MediaCardSkeleton() {
  return (
    <div>
      <Skeleton className="relative aspect-2/3 rounded-[10px] mb-2" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
