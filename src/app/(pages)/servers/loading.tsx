import Skeleton from "@/components/skeleton/ui/skeleton";
import Card, { CardContent, CardHeader } from "@/components/ui/card";

function PieCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-3 w-24 rounded" />
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <Skeleton className="size-48 shrink-0 rounded-full" />
        <div className="flex w-full min-w-0 flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="size-2.5 shrink-0 rounded-full" />
              <Skeleton className="h-4 flex-1 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function TrackerStatsLoading() {
  return (
    <div
      className="mt-10 flex w-full flex-col items-center justify-center gap-10"
      aria-live="polite"
      aria-busy="true"
    >
      <header className="w-full max-w-[980px]">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">Server Tracker Stats</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Live statistics of the Minecraft servers we track: their software, versions, and locations.
        </p>
      </header>

      <div className="flex w-full max-w-[980px] flex-col gap-4">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-3 w-28 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-9 w-32 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
          <PieCardSkeleton />
          <PieCardSkeleton />
          <PieCardSkeleton />
        </div>
      </div>
    </div>
  );
}
