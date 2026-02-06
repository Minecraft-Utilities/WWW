import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";
import Image from "next/image";
import Card, { CardHeader } from "../ui/card";

export default function PlayerCapes({ player }: { player: CachedPlayer }) {
  const hasCape = player.cape !== undefined;
  const vanillaCape = player.cape!;

  if (!hasCape) {
    return null;
  }

  return (
    <Card className="flex h-fit flex-col overflow-hidden p-0 min-w-48">
      <CardHeader>Cape</CardHeader>
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
