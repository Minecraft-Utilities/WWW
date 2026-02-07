import { mcUtilsApi } from "@/common/mc-utils";
import PlayerCapes from "@/components/player/player-capes";
import PlayerDetails from "@/components/player/player-details";
import PlayerHeader from "@/components/player/player-header";
import PlayerSkin from "@/components/player/skin/player-skin";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { Metadata } from "next";
import { cache } from "react";

export const dynamic = "force-dynamic";

const getPlayer = cache((query: string) => mcUtilsApi.fetchPlayer(query));

export interface PlayerPageProps {
  params: Promise<{
    query: string;
  }>;
}

export async function generateMetadata(props: PlayerPageProps): Promise<Metadata> {
  const { query } = await props.params;
  const { player } = await getPlayer(query);

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
    description: `Minecraft player profile for ${player.username} (UUID: ${player.uniqueId})`,
    openGraph: {
      description: `View the information for ${player.username}`,
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

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { query } = await params;
  const { player, error } = await getPlayer(query);

  return (
    <div className="mt-24 flex w-full flex-col items-center gap-6">
      {error && (
        <Card className="border-destructive/50 bg-destructive/10 w-full max-w-xl overflow-hidden p-0">
          <CardHeader variant="destructive">Error</CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{error.message}</p>
          </CardContent>
        </Card>
      )}

      {player && (
        <div className="flex w-full flex-col items-center gap-24">
          {/* Player Header */}
          <PlayerHeader player={player} />

          <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row">
            {/* Skin and Cape */}
            <section className="flex w-full flex-col gap-4 md:max-w-88">
              <PlayerSkin player={player} />
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
