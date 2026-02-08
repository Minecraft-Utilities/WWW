import Card, { CardContent, CardFooter } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

export default function SkinsLoading() {
  return (
    <div
      className="mt-24 flex w-full flex-col items-center justify-center gap-24"
      aria-live="polite"
      aria-busy="true"
    >
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <div className="bg-muted/30 h-10 w-48 animate-pulse rounded-md" />
        <div className="bg-muted/30 h-5 w-72 max-w-full animate-pulse rounded-md" />
      </header>
      <div className="flex max-w-5xl flex-wrap justify-center gap-6">
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 25 }).map((_, i) => (
            <Card key={i} className="w-44 shrink-0 md:w-44">
              <CardContent className="flex min-h-0 flex-1 items-center justify-center p-4">
                <div className="bg-muted/30 h-[120px] w-[70px] animate-pulse rounded-md" />
              </CardContent>
              <CardFooter className="flex items-center gap-2">
                <UserIcon className="text-muted-foreground/50 size-4" />
                <div className="bg-muted/30 h-[20px] w-12 animate-pulse rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <div className="bg-muted/30 h-9 w-9 animate-pulse rounded-md" />
          <div className="bg-muted/30 h-4 w-24 animate-pulse rounded-md" />
          <div className="bg-muted/30 h-9 w-9 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
}
