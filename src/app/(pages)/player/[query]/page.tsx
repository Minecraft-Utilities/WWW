import { mcUtilsApi } from "@/common/mc-utils";
import PlayerCapes from "@/components/player/player-capes";
import PlayerDetails from "@/components/player/player-details";
import PlayerHeader from "@/components/player/player-header";
import PlayerUsernameHistory from "@/components/player/player-username-history";
import PlayerSkin from "@/components/player/skin/player-skin";
import PlayerSkins from "@/components/player/skin/player-skins";
import { SelectedCapeProvider } from "@/components/provider/selected-cape-provider";
import { SelectedSkinProvider } from "@/components/provider/selected-skin-provider";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import type { FullPlayer } from "mcutils-js-api/dist/types/player/player";
import { Metadata } from "next";
import { cache } from "react";

export const dynamic = "force-dynamic";

const getPlayer = cache(async (query: string) => {
  const result = await mcUtilsApi.fetchPlayer(query, "FULL");
  return { player: result.player as FullPlayer | undefined, error: result.error };
});

export async function generateMetadata(props: PageProps<"/player/[query]">): Promise<Metadata> {
  const { query } = await props.params;
  const { player } = await getPlayer(query);

  if (player === undefined) {
    return {
      title: "Player not found",
      description: "This Minecraft player could not be found.",
      openGraph: {
        title: "Player not found",
        description: "This Minecraft player could not be found.",
      },
    };
  }
  const image = player.skin.parts.FULLBODY_ISO_FRONT;
  return {
    title: `${player.username} — Minecraft Profile, Skin & UUID`,
    description: `View ${player.username}'s Minecraft skin, cape, UUID, and profile history on MC Utils.`,
    openGraph: {
      title: `${player.username} — Minecraft Profile, Skin & UUID`,
      description: `View ${player.username}'s Minecraft skin, cape, UUID, and profile history on MC Utils.`,
      images: [
        {
          url: image,
        },
      ],
    },
    icons: {
      icon: image,
    },
  };
}

export default async function PlayerPage({ params }: PageProps<"/player/[query]">) {
  const { query } = await params;
  const { player, error } = await getPlayer(query);

  return (
    <div className="mt-16 flex w-full flex-col items-center gap-6">
      {error && (
        <Card className="border-destructive/50 bg-destructive/10 w-full max-w-xl overflow-hidden p-0">
          <CardHeader variant="destructive">Error</CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{error.message}</p>
          </CardContent>
        </Card>
      )}

      {player && (
        <div className="flex w-full flex-col items-center gap-16">
          {/* Player Header */}
          <PlayerHeader player={player} />

          <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row">
            {/* Skin and Cape */}
            <section className="flex w-full flex-col gap-4 md:max-w-90 md:[&_>div]:border-r-0">
              <SelectedCapeProvider initialCape={player.cape ?? null}>
                <SelectedSkinProvider key={player.skin.textureId} initialSkin={player.skin}>
                  <PlayerSkin player={player} />
                  <PlayerSkins player={player} />
                </SelectedSkinProvider>
                <PlayerCapes player={player} />
              </SelectedCapeProvider>
            </section>

            {/* Player Details */}
            <div className="flex min-w-0 flex-1 flex-col gap-4 md:[&_>div]:border-l-0">
              <PlayerDetails player={player} />
              <PlayerUsernameHistory player={player} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
