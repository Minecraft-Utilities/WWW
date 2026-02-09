import Card, { CardContent, CardHeader } from "@/components/ui/card";
import DetailRowsSkeleton from "@/components/skeleton/ui/detail-rows-skeleton";

export default function ServerDetailsSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <Card className="w-full min-w-0 overflow-hidden p-0">
        <CardHeader>Details</CardHeader>
        <CardContent>
          <DetailRowsSkeleton count={9} />
        </CardContent>
      </Card>
    </section>
  );
}
