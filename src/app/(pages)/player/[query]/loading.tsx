import Card, { CardContent, CardHeader } from "@/components/ui/card";

export default function PlayerLoading() {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-6" aria-live="polite" aria-busy="true">
      <div className="flex w-full flex-col items-center gap-24">
        <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted/30 size-16 animate-pulse rounded-md" />
            <div className="bg-muted/30 h-9 w-48 animate-pulse rounded-md" />
          </div>
          <div className="border-border bg-muted/30 flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border px-3 py-1.5">
            <div className="bg-muted/30 h-5 max-w-xs min-w-0 flex-1 animate-pulse rounded" />
            <div className="bg-muted/30 size-6 shrink-0 animate-pulse rounded-md" />
          </div>
        </header>
        <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row">
          <section className="flex w-full flex-col gap-4 md:max-w-88">
            <Card className="overflow-hidden p-0">
              <CardHeader>Skin</CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-muted/30 ring-border/50 h-72 w-full max-w-[280px] animate-pulse rounded-xl ring-1" />
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="bg-muted/30 size-14 animate-pulse rounded-lg" />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="h-fit min-w-48 overflow-hidden p-0">
              <CardHeader>Cape</CardHeader>
              <CardContent className="flex h-full items-center justify-center">
                <div className="bg-muted/30 h-[105px] w-full max-w-[280px] animate-pulse rounded-xl" />
              </CardContent>
            </Card>
          </section>
          <Card className="h-fit w-full overflow-hidden p-0 md:flex-1">
            <CardHeader>Details</CardHeader>
            <CardContent className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-muted/30 h-6 w-full max-w-xs animate-pulse rounded-md" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
