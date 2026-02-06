import { Player } from "mcutils-js-api/dist/types/player/player";
import Card from "../ui/card";
import Image from "next/image";

export default function PlayerCapes({ player }: { player: Player }) {
  const hasCape = player.cape !== undefined;
  const vanillaCape = player.cape!;

  if (!hasCape) {
    return null;
  }

  return (
    <Card className="flex h-fit flex-col overflow-hidden p-0 min-w-48">
      <div className="border-b border-border/60 bg-muted/20 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Cape
        </p>
      </div>
      <div className="flex flex-col justify-center p-4">
        <Image
          src={vanillaCape.parts.FRONT}
          alt={`${player.username} cape`}
          width={64}
          height={64}
          unoptimized
          className="object-cover rounded-lg"
        />
      </div>
    </Card>
  );
}
