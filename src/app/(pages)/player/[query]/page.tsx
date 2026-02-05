import { mcUtilsApi } from "@/app/common/mc-utils";
import CopyTextButton from "@/components/copy-text-button";
import PlayerCapes from "@/components/player/player-capes";
import Card from "@/components/ui/card";
import Image from "next/image";

type Props = {
  params: Promise<{
    query: string;
  }>;
};

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
        <div className="flex w-full max-w-3xl flex-col-reverse gap-6 sm:flex-row sm:items-start sm:gap-8">
          {/* Skin and Cape */}
          <div className="flex shrink-0 flex-col gap-4">
            <Card className="items-center overflow-hidden p-0">
              <Image
                src={player.skin.parts.FULLBODY_FRONT}
                alt={`${player.username} skin - front`}
                width={256}
                height={256}
                unoptimized
                className="object-cover p-4"
              />
            </Card>

            <PlayerCapes player={player} />
          </div>

          {/* Player Info */}
          <Card className="flex min-w-0 flex-1 flex-col gap-6 p-6 sm:p-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {player.username}
            </h1>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                UUID
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 font-mono text-sm">
                <span className="break-all text-foreground">
                  {player.uniqueId}
                </span>
                <CopyTextButton
                  text={player.uniqueId}
                  tooltip={`Copy ${player.username}'s UUID`}
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
