import { mcUtilsApi } from "@/common/mc-utils";
import CopyTextButton from "@/components/copy-text-button";
import PlayerCapes from "@/components/player/player-capes";
import PlayerSkin from "@/components/player/player-skin";
import Card from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

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
    <div className="flex w-full flex-col items-center gap-6">
      {error && (
        <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10">
          <p className="font-medium text-destructive">Error</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </Card>
      )}

      {player && (
        <div className="flex flex-col w-full max-w-3xl gap-24 mt-24">
          {/* Player Info */}
          <section className="flex min-w-0 flex-1 flex-col gap-4 items-center">
            <div className="flex items-center gap-4">
              <Image
                src={player.skin.parts.HEAD}
                alt={player.username}
                width={64}
                height={64}
                unoptimized
              />
              <h1 className="text-4xl font-bold tracking-tight text-foreground text-center">
                {player.username}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 px-3 py-2 font-mono text-sm w-fit">
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
