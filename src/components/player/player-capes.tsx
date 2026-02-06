import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";
import Image from "next/image";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerCapesProps {
  player: CachedPlayer;
}

export default function PlayerCapes({ player }: PlayerCapesProps) {
  const cape = player.cape;
  if (!cape) {
    return null;
  }

  return (
    <Card className="flex h-fit min-w-48 flex-col overflow-hidden p-0">
      <CardHeader>Cape</CardHeader>
      <CardContent className="flex">
        <SimpleTooltip
          display={
            <span>
              <b>{cape.name}</b> Cape
            </span>
          }
        >
          <Image
            src={cape.parts.FRONT}
            alt={`${player.username} cape`}
            width={64}
            height={64}
            className="rounded-lg object-cover"
            unoptimized
          />
        </SimpleTooltip>
      </CardContent>
    </Card>
  );
}
