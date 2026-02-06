import Card, { CardContent, CardHeader } from "@/components/ui/card";

export default function PlayerLoading() {
  return (
    <div
      className="mt-24 flex w-full flex-col items-center gap-6"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex w-full flex-col items-center gap-24">
        <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted/30 size-16 animate-pulse rounded-md" />
            <div className="bg-muted/30 h-10 w-48 animate-pulse rounded-md" />
          </div>
          <div className="bg-muted/30 h-9 w-72 max-w-full animate-pulse rounded-lg" />
        </header>
        <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row">
          <section className="flex w-full flex-col gap-4 md:max-w-88">
            <Card className="flex flex-col overflow-hidden p-0">
              <CardHeader>Skin</CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-muted/30 ring-border/50 h-72 w-full max-w-[280px] animate-pulse rounded-xl ring-1" />
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-muted/30 size-14 animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="flex h-fit min-w-48 flex-col overflow-hidden p-0">
              <CardHeader>Cape</CardHeader>
              <CardContent className="flex flex-col justify-center">
                <div className="bg-muted/30 size-16 animate-pulse rounded-lg" />
              </CardContent>
            </Card>
          </section>
          <Card className="flex h-fit w-full flex-col overflow-hidden p-0 md:flex-1">
            <CardHeader>Details</CardHeader>
            <CardContent className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-muted/30 h-6 w-full max-w-xs animate-pulse rounded-md"
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
