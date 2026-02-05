import { Player } from "mcutils-js-api/dist/types/player/player";
import Card from "../ui/card";
import Image from "next/image";

export default function PlayerCapes({ player }: { player: Player }) {
  const hasCape = player.cape !== undefined;

  if (!hasCape) {
    return null;
  }

  return (
    <Card className="flex flex-col gap-3">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Cape
      </p>
      <Image
        src={player.cape!.parts.FRONT}
        alt={`${player.username} cape`}
        width={48}
        height={48}
        unoptimized
        className="object-cover rounded-lg"
      />
    </Card>
  );
}
