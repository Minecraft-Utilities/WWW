import { mcUtilsApi } from "@/common/mc-utils";
import PlayerCapes from "@/components/player/player-capes";
import PlayerDetails from "@/components/player/player-details";
import PlayerHeader from "@/components/player/player-header";
import PlayerSkin from "@/components/player/player-skin";
import Card, { CardHeader } from "@/components/ui/card";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    query: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { query } = await props.params;
  const { player } = await mcUtilsApi.fetchPlayer(query);

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
  const skullUrl = player.skin.parts.HEAD;
  return {
    title: `${player.username}`,
    openGraph: {
      title: `${player.username}`,
      description: `UUID: ${player.uniqueId}`,
      images: [
        {
          url: skullUrl,
        },
      ],
    },
    icons: {
      icon: skullUrl,
    },
  };
}

export default async function PlayerPage({ params }: Props) {
  const { query } = await params;
  const { player, error } = await mcUtilsApi.fetchPlayer(query);

  return (
    <div className="flex w-full flex-col items-center gap-6 mt-24">
      {error && (
        <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10 p-0 overflow-hidden">
          <CardHeader variant="destructive">Error</CardHeader>
          <p className="px-4 py-3 text-sm text-muted-foreground">
            {error.message}
          </p>
        </Card>
      )}

      {player && (
        <div className="flex flex-col w-full items-center gap-24">
          {/* Player Header */}
          <PlayerHeader player={player} />

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
            {/* Skin and Cape */}
            <section className="flex flex-col gap-4 w-full md:max-w-88">
              <PlayerSkin skin={player.skin} username={player.username} />
              <PlayerCapes player={player} />
            </section>

            {/* Player Details */}
            <PlayerDetails player={player} />
          </div>
        </div>
      )}
    </div>
  );
}
