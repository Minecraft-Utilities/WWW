import CapeHeaderSkeleton from "@/components/skeleton/cape/cape-header-skeleton";
import Skeleton from "@/components/skeleton/ui/skeleton";
import Card, { CardContent, CardHeader } from "@/components/ui/card";

export default function CapeLoading() {
  return (
    <div
      className="mt-16 flex w-full flex-col items-center justify-center gap-16"
      aria-live="polite"
      aria-busy="true"
    >
      <CapeHeaderSkeleton />

      <div className="flex w-full max-w-5xl flex-col gap-4 md:flex-row">
        {/* Left — cape + players */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
          <Card className="h-fit w-full">
            <CardContent className="flex items-center justify-center p-4">
              <div className="h-96" />
            </CardContent>
          </Card>

          <Card className="h-fit w-full text-sm">
            <CardHeader>
              <p>Players</p>
            </CardHeader>
            <CardContent className="flex h-64 flex-wrap gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-20 rounded" />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right — details */}
        <div className="flex w-full min-w-0 flex-col gap-4 md:max-w-sm">
          <Card className="h-fit w-full">
            <CardHeader>
              <p>First Owned By</p>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-32 rounded" />
            </CardContent>
          </Card>

          <Card className="h-fit w-full">
            <CardHeader>
              <p>Details</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-2/3 rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
