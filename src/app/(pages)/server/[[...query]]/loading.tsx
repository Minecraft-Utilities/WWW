import Card, { CardContent, CardHeader } from "@/components/ui/card";

export default function ServerLoading() {
  return (
    <div
      className="mt-24 flex w-full flex-col items-center gap-6"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex w-full max-w-3xl flex-col gap-24">
        <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted/30 size-16 animate-pulse rounded-md" />
            <div className="bg-muted/30 h-10 w-64 animate-pulse rounded-md" />
          </div>
        </header>
        <div className="flex flex-col gap-4">
          <Card className="h-fit items-center overflow-hidden p-0">
            <CardContent className="flex items-center justify-center">
              <div className="bg-muted/30 h-32 w-full animate-pulse rounded-2xl" />
            </CardContent>
          </Card>
          <Card className="flex w-full min-w-0 flex-col overflow-hidden p-0">
            <CardHeader>Details</CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted/30 h-5 w-full max-w-sm animate-pulse rounded-md"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
