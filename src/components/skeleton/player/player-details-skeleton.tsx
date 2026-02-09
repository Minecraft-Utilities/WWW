import Card, { CardContent, CardHeader } from "@/components/ui/card";
import DetailRowsSkeleton from "@/components/skeleton/ui/detail-rows-skeleton";

export default function PlayerDetailsSkeleton() {
  return (
    <Card className="h-fit w-full overflow-hidden p-0 md:flex-1">
      <CardHeader>Details</CardHeader>
      <CardContent className="flex flex-col">
        <DetailRowsSkeleton count={3} labelWidth="short" />
      </CardContent>
    </Card>
  );
}
