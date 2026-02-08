import Card, { CardContent, CardHeader } from "@/components/ui/card";

export default function ServerLoading() {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-6" aria-live="polite" aria-busy="true">
      <div className="flex w-full max-w-3xl flex-col gap-24">
        {/* ServerHeader skeleton: optional favicon + title */}
        <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="bg-muted/30 size-16 animate-pulse rounded-md" />
            <div className="bg-muted/30 h-9 w-64 animate-pulse rounded-md md:h-10" />
          </div>
        </header>

        <div className="flex flex-col gap-4">
          {/* ServerMotd skeleton: Card with MOTD image 768×128 aspect (~6:1) */}
          <section className="flex flex-col gap-4">
            <Card className="h-fit items-center overflow-hidden p-0">
              <CardContent className="flex items-center justify-center">
                <div className="bg-muted/30 h-[85px] w-auto max-w-2xl animate-pulse rounded-md" />
              </CardContent>
            </Card>
          </section>

          {/* ServerDetails skeleton: same DetailRow count as full Java server (9 rows) */}
          <section className="flex flex-col gap-4">
            <Card className="w-full min-w-0 overflow-hidden p-0">
              <CardHeader>Details</CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="xs:flex-row xs:flex-wrap xs:items-center xs:justify-between xs:gap-2 flex flex-col gap-1.5 py-1.5 first:pt-0 last:pb-0"
                    >
                      <div className="bg-muted/30 h-4 w-16 shrink-0 animate-pulse rounded" />
                      <div className="bg-muted/30 h-7 min-w-0 flex-1 animate-pulse rounded-md px-2 py-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ServerDnsRecords skeleton: table with 3 columns, several rows */}
          <section className="flex flex-col gap-4">
            <Card className="w-full min-w-0 overflow-hidden p-0">
              <CardHeader>DNS Records</CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="border-border min-w-0 overflow-x-auto rounded-lg border [-webkit-overflow-scrolling:touch]">
                    <table className="w-full min-w-[320px] text-left text-sm">
                      <thead>
                        <tr className="border-border bg-muted/30 border-b">
                          <th className="text-muted-foreground px-3 py-2 font-medium whitespace-nowrap">
                            <div className="bg-muted/30 h-4 w-20 animate-pulse rounded" />
                          </th>
                          <th className="text-muted-foreground px-3 py-2 font-medium whitespace-nowrap">
                            <div className="bg-muted/30 h-4 w-12 animate-pulse rounded" />
                          </th>
                          <th className="text-muted-foreground px-3 py-2 font-medium whitespace-nowrap">
                            <div className="bg-muted/30 h-4 w-14 animate-pulse rounded" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 4 }).map((_, i) => (
                          <tr key={i} className="border-border/50 border-b last:border-0">
                            <td className="px-3 py-2">
                              <div className="bg-muted/30 h-4 w-24 animate-pulse rounded font-mono" />
                            </td>
                            <td className="px-3 py-2">
                              <div className="bg-muted/30 h-4 w-10 animate-pulse rounded font-mono" />
                            </td>
                            <td className="px-3 py-2">
                              <div className="bg-muted/30 h-4 w-32 animate-pulse rounded font-mono" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
