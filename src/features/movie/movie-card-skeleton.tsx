import { Skeleton } from "@/shared/ui/kit/skeleton";

export const MovieCardSkeleton = () => {
  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6">
      <div className="aspect-[2/3] relative">
        <Skeleton className="absolute inset-0 size-full rounded-xl" />
      </div>

      <div className="p-6 md:p-8">
        <div className="p-0 mb-4">
          <div className="flex items-baseline gap-3 mb-2">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[60px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-5 w-[40px] rounded-full" />
          </div>
        </div>

        <div className="p-0 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <Skeleton className="h-4 w-[80px] mb-1" />
              <div className="flex gap-2 items-center">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-[30px]" />
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-[90px] mb-1" />
              <div className="flex gap-2 items-center">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-[30px]" />
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-[100px] mb-1" />
              <Skeleton className="h-5 w-[70px]" />
            </div>
          </div>
        </div>

        <div className="p-0 mt-6">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-[60px] rounded-md" />
            <Skeleton className="h-7 w-[80px] rounded-md" />
            <Skeleton className="h-7 w-[70px] rounded-md" />
            <Skeleton className="h-7 w-[90px] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
