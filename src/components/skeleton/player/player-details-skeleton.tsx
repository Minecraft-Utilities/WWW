import DetailRowsSkeleton from "@/components/skeleton/ui/detail-rows-skeleton";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { BugIcon } from "lucide-react";

export default function PlayerDetailsSkeleton() {
  return (
    <Card className="h-fit w-full overflow-hidden p-0 md:flex-1">
      <CardHeader className="flex items-center justify-between">
        <span>Details</span>
        <BugIcon className="text-muted-foreground size-4" />
      </CardHeader>
      <CardContent className="flex flex-col">
        <DetailRowsSkeleton count={3} labelWidth="short" />
      </CardContent>
    </Card>
  );
}
