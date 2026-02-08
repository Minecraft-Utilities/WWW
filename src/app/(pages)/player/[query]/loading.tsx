import Card, { CardContent, CardHeader } from "@/components/ui/card";

export default function PlayerLoading() {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-6" aria-live="polite" aria-busy="true">
      <div className="flex w-full flex-col items-center gap-24">
        {/* PlayerHeader skeleton: avatar + title, then UUID bar */}
        <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="bg-muted/30 size-16 animate-pulse rounded-md" />
            <div className="bg-muted/30 h-9 w-48 animate-pulse rounded-md md:h-10 md:w-64" />
          </div>
          <div className="border-border bg-muted/30 flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border px-3 py-1.5">
            <div className="bg-muted/30 h-5 max-w-xs min-w-0 flex-1 animate-pulse rounded" />
            <div className="bg-muted/30 size-6 shrink-0 animate-pulse rounded-md" />
          </div>
        </header>

        <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row">
          {/* Left column: Skin, Skins, Capes, Optifine Cape — md:max-w-88 */}
          <section className="flex w-full flex-col gap-4 md:max-w-88">
            {/* PlayerSkin card: h-72 viewport + 6× size-10 buttons */}
            <Card className="overflow-hidden p-0">
              <CardHeader>Skin</CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-muted/30 ring-border/50 flex h-72 w-full items-center justify-center animate-pulse rounded-xl ring-1" />
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-muted/30 size-10 animate-pulse rounded-lg" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PlayerSkins card: min-w-48, 38×38 thumbnails */}
            <Card className="h-fit min-w-48 overflow-hidden p-0">
              <CardHeader>Skins</CardHeader>
              <CardContent className="flex h-full items-center justify-center gap-2">
                <div className="bg-muted/30 size-[38px] animate-pulse rounded-sm" />
                <div className="bg-muted/30 size-[38px] animate-pulse rounded-sm" />
                <div className="bg-muted/30 size-[38px] animate-pulse rounded-sm" />
              </CardContent>
            </Card>

            {/* PlayerCapes card: min-w-48, h-[64px] cape */}
            <Card className="h-fit min-w-48 overflow-hidden p-0">
              <CardHeader>Capes</CardHeader>
              <CardContent className="flex h-full items-center justify-center gap-2">
                <div className="bg-muted/30 h-[64px] w-10 animate-pulse rounded-sm" />
              </CardContent>
            </Card>
          </section>

          {/* PlayerDetails card: w-full md:flex-1, 3 detail rows */}
          <Card className="h-fit w-full overflow-hidden p-0 md:flex-1">
            <CardHeader>Details</CardHeader>
            <CardContent className="flex flex-col">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="xs:flex-row xs:flex-wrap xs:items-center xs:justify-between xs:gap-2 flex flex-col gap-1.5 py-1.5 first:pt-0 last:pb-0"
                >
                  <div className="bg-muted/30 h-4 w-12 shrink-0 animate-pulse rounded" />
                  <div className="bg-muted/30 h-7 min-w-0 flex-1 animate-pulse rounded-md px-2 py-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
