import { mcUtilsApi } from "@/app/common/mc-utils";
import CopyTextButton from "@/components/copy-text-button";
import PlayerCapes from "@/components/player/player-capes";
import PlayerSkin from "@/components/player/player-skin";
import Card from "@/components/ui/card";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    query: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { query } = await props.params;
  const { player, error } = await mcUtilsApi.fetchPlayer(query);

  if (player === undefined) {
    return {
      title: "Player not found",
      description: "Player not found",
      openGraph: {
        title: "Player not found",
        description: "Player not found",
      },
    };
  }

  return {
    title: `${player.username}`,
    openGraph: {
      siteName: "MC Utils",
      title: `${player.username}`,
    },
    twitter: {
      card: "summary",
    },
  };
}

export default async function PlayerPage({ params }: Props) {
  const { query } = await params;
  const { player, error } = await mcUtilsApi.fetchPlayer(query);

  return (
    <div className="flex w-full flex-col items-center gap-6 pt-2">
      {error && (
        <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10">
          <p className="font-medium text-destructive">Error</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </Card>
      )}

      {player && (
        <div className="flex flex-col w-full max-w-3xl gap-12 mt-10">
          {/* Player Info */}
          <section className="flex min-w-0 flex-1 flex-col gap-4 items-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground text-center">
              {player.username}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2 font-mono text-sm w-fit">
              <span className="break-all text-foreground">
                {player.uniqueId}
              </span>
              <CopyTextButton
                text={player.uniqueId}
                tooltip={`Copy ${player.username}'s UUID`}
              />
            </div>
          </section>

          {/* Skin and Cape */}
          <section className="flex flex-col gap-4">
            <PlayerSkin skin={player.skin} username={player.username} />
            <PlayerCapes player={player} />
          </section>
        </div>
      )}
    </div>
  );
}
