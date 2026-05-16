import { env } from "@/common/env";
import { mcUtilsApi } from "@/common/mc-utils";
import { formatDate } from "@/common/time-utils";
import SimpleLink from "@/components/simple-link";
import SimpleTooltip from "@/components/simple-tooltip";
import TimeAgo from "@/components/time-ago";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recent Name Changes",
  description: "Recent Minecraft username changes across all players tracked by MC Utils.",
};

export default async function NamesPage() {
  const { nameChanges, error } = await mcUtilsApi.getRecentNameChanges();

  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-10">
      <header className="w-full max-w-6xl">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">Recent Name Changes</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Recent Minecraft username changes across all players tracked by MC Utils.
        </p>
      </header>

      {error && (
        <Card className="border-destructive/50 bg-destructive/10 w-full max-w-2xl overflow-hidden p-0">
          <CardHeader variant="destructive">Error</CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{error.message}</p>
          </CardContent>
        </Card>
      )}

      {nameChanges && nameChanges.length > 0 && (
        <Card className="w-full max-w-6xl overflow-hidden p-0">
          <CardHeader>Name Changes</CardHeader>
          <CardContent className="p-0">
            <div className="divide-border/60 divide-y">
              {nameChanges.map(change => (
                <div key={change.playerId} className="flex items-center gap-2 px-3 py-2">
                  <SimpleLink href={`/player/${change.newUsername}`}>
                    <Image
                      src={`${env.NEXT_PUBLIC_API_URL}/skins/${change.newUsername}/face.png`}
                      alt={change.newUsername}
                      width={22}
                      height={22}
                      className="rounded-sm"
                    />
                  </SimpleLink>

                  <div className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
                    <span className="text-muted-foreground truncate">{change.previousUsername}</span>
                    <ArrowRightIcon className="text-muted-foreground size-3 shrink-0" aria-hidden />
                    <SimpleLink
                      href={`/player/${change.newUsername}`}
                      className="text-foreground font-medium hover:underline"
                    >
                      {change.newUsername}
                    </SimpleLink>
                  </div>

                  <SimpleTooltip
                    display={`Name change seen on ${formatDate(new Date(change.timestamp), "Do MMMM, YYYY HH:mm a")}`}
                  >
                    <span className="text-muted-foreground shrink-0 text-xs">
                      <TimeAgo date={new Date(change.timestamp)} />
                    </span>
                  </SimpleTooltip>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
