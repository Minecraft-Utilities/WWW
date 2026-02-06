import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";
import Image from "next/image";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerCapesProps {
  player: CachedPlayer;
}

export default function PlayerCapes({ player }: PlayerCapesProps) {
  const cape = player.cape;

  return (
    <Card className="flex h-fit min-w-48 flex-col overflow-hidden p-0">
      <CardHeader>Cape</CardHeader>
      <CardContent className="flex h-full items-center justify-center">
        {cape ? (
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
              height={105}
              className="h-[105px] rounded-lg object-cover"
              unoptimized
            />
          </SimpleTooltip>
        ) : (
          <div className="flex h-full min-h-[105px] flex-col items-center justify-center">
            <p className="text-muted-foreground text-center text-sm">No capes available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
