import Skeleton from "@/components/skeleton/ui/skeleton";

export default function SkinHeaderSkeleton() {
  return (
    <header className="flex min-w-0 flex-1 flex-col items-center gap-4 px-4">
      <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-5">
        <Skeleton className="h-7 w-32 rounded-md sm:h-9 sm:w-40" />
        <Skeleton className="h-7 w-40 rounded-md sm:h-9 sm:w-48" />
      </div>
    </header>
  );
}
