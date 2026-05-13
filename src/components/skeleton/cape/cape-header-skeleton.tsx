import Skeleton from "@/components/skeleton/ui/skeleton";

export default function CapeHeaderSkeleton() {
  return (
    <header className="flex min-w-0 flex-1 flex-col items-center gap-4 px-4">
      <Skeleton className="h-7 w-48 rounded-md sm:h-9 sm:w-64" />
    </header>
  );
}
