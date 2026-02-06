import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";
import Image from "next/image";
import Card, { CardContent, CardHeader } from "../ui/card";

export default function PlayerCapes({ player }: { player: CachedPlayer }) {
  const hasCape = player.cape !== undefined;
  const vanillaCape = player.cape!;

  if (!hasCape) {
    return null;
  }

  return (
    <Card className="flex h-fit min-w-48 flex-col overflow-hidden p-0">
      <CardHeader>Cape</CardHeader>
      <CardContent className="flex flex-col justify-center">
        <Image
          src={vanillaCape.parts.FRONT}
          alt={`${player.username} cape`}
          width={64}
          height={64}
          unoptimized
          className="rounded-lg object-cover"
        />
      </CardContent>
    </Card>
  );
}
