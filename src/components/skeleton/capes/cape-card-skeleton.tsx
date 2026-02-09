import Skeleton from "@/components/skeleton/ui/skeleton";
import Card, { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

export default function CapeCardSkeleton() {
  return (
    <Card className="w-44 shrink-0 md:w-50">
      <CardHeader className="shrink-0">
        <Skeleton className="h-4 w-28" />
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 items-center justify-center p-4">
        <Skeleton className="mx-auto h-[120px] w-[75px]" />
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <UserIcon className="size-4" />
        <Skeleton className="h-[20px] w-10" />
      </CardFooter>
    </Card>
  );
}
