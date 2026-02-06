import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";
import Image from "next/image";
import CopyTextButton from "../copy-text-button";

export interface PlayerHeaderProps {
  player: CachedPlayer;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  return (
    <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Image src={player.skin.parts.HEAD} alt={player.username} width={64} height={64} unoptimized />
        <h1 className="text-foreground text-center text-4xl font-bold tracking-tight">{player.username}</h1>
      </div>

      <div className="border-border bg-muted/30 flex w-full min-w-0 flex-wrap items-center justify-between gap-4 rounded-lg border px-3 py-1.5 text-sm">
        <span className="text-foreground min-w-0 flex-1 break-all">{player.uniqueId}</span>
        <span className="shrink-0">
          <CopyTextButton text={player.uniqueId} tooltip={`Copy ${player.username}'s UUID`} />
        </span>
      </div>
    </header>
  );
}
