import Skeleton from "@/components/skeleton/ui/skeleton";
import Card, { CardContent, CardHeader } from "@/components/ui/card";

export default function PlayerSkinCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader>Skin</CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-muted/30 ring-border/50 flex h-72 w-full animate-pulse items-center justify-center rounded-xl ring-1" />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="size-10 rounded-lg" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
