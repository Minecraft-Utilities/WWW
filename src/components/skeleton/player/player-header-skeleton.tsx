import Skeleton from "@/components/skeleton/ui/skeleton";

export default function PlayerHeaderSkeleton() {
  return (
    <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Skeleton className="size-16" />
        <Skeleton className="h-9 w-48 rounded-md md:h-10 md:w-64" />
      </div>
      <div className="border-border bg-muted/30 flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border px-3 py-1.5">
        <Skeleton className="h-5 max-w-xs min-w-0 flex-1 rounded" />
        <Skeleton className="size-6 shrink-0 rounded-md" />
      </div>
    </header>
  );
}
