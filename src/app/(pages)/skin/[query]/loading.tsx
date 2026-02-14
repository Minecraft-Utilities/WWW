import SkinHeadCommandsSkeleton from "@/components/skeleton/skin/skin-head-commands-skeleton";
import SkinHeaderSkeleton from "@/components/skeleton/skin/skin-header-skeleton";
import Skeleton from "@/components/skeleton/ui/skeleton";
import Card, { CardContent, CardHeader } from "@/components/ui/card";

export default function SkinLoading() {
  return (
    <div
      className="mt-16 flex w-full flex-col items-center justify-center gap-16"
      aria-live="polite"
      aria-busy="true"
    >
      <SkinHeaderSkeleton />

      <div className="flex w-full max-w-5xl flex-col gap-4 md:flex-row">
        {/* Left */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
          <Card className="h-fit w-full">
            <CardHeader>
              <p>Skin</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Skeleton className="h-80 w-[188px] rounded-lg" />
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

        {/* Right */}
        <div className="flex w-full min-w-0 flex-col gap-4 md:max-w-sm">
          <Card className="h-fit w-full">
            <CardHeader>
              <p>First Used By</p>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-32 rounded" />
            </CardContent>
          </Card>

          <SkinHeadCommandsSkeleton />
        </div>
      </div>
    </div>
  );
}
