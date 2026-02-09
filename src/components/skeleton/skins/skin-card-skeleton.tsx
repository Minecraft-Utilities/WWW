import Card, { CardContent, CardFooter } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import Skeleton from "@/components/skeleton/ui/skeleton";

export default function SkinCardSkeleton() {
  return (
    <Card className="w-44 shrink-0 md:w-44">
      <CardContent className="flex min-h-0 flex-1 items-center justify-center p-4">
        <Skeleton className="h-[120px] w-[70px]" />
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <UserIcon className="text-muted-foreground/50 size-4" />
        <Skeleton className="h-[20px] w-12" />
      </CardFooter>
    </Card>
  );
}
