import { Player } from "mcutils-js-api/dist/types/player/player";
import Image from "next/image";
import CopyTextButton from "../copy-text-button";
import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";

export default function PlayerHeader({ player }: { player: CachedPlayer }) {
  return (
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
        <span className="break-all text-foreground">{player.uniqueId}</span>
        <CopyTextButton
          text={player.uniqueId}
          tooltip={`Copy ${player.username}'s UUID`}
        />
      </div>
    </section>
  );
}
