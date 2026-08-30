import { Skeleton } from "@/components/ui/skeleton";

export default function MediaDetailSkeleton() {
  return (
    <div>
      <div className="relative h-[54vh] min-h-125 w-full overflow-hidden">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-linear-to-t from-background from-0% via-background/70 via-40% to-transparent to-100%" />

        <div className="max-w-300 mx-auto px-4 mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="relative w-48 md:w-64 aspect-2/3 rounded-xl shrink-0 shadow-xl" />

            <div className="flex flex-col justify-end p-4 flex-1">
              <Skeleton className="h-9 md:h-10 w-3/4 max-w-md" />

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>

              <div className="mt-6">
                <Skeleton className="h-11 w-40 rounded-md" />
              </div>

              <div className="mt-4 max-w-2xl space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-300 mx-auto px-4">
        <Skeleton className="h-8 w-24 mb-6" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="basis-1/8 shrink-0 space-y-2">
              <Skeleton className="aspect-square w-full rounded-full" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-300 mx-auto px-4 mt-16 pb-6">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="basis-1/5 shrink-0 space-y-2">
              <Skeleton className="aspect-2/3 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
