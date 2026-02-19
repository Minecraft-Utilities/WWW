import { Player } from "mcutils-js-api/dist/types/player/player";
import Image from "next/image";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerCapesProps {
  player: Player;
}

export const CAPE_ASPECT_RATIO = 480 / 768;

export default function PlayerCapes({ player }: PlayerCapesProps) {
  const capes = player.capeHistory ?? [];

  return (
    <Card className="h-fit min-w-48 overflow-hidden p-0">
      <CardHeader>Capes ({capes.length})</CardHeader>
      <CardContent className="flex h-full items-center justify-center gap-2">
        {capes.length > 0 ? (
          <>
            {/* Vanilla Cape */}
            {capes.map(cape => (
              <SimpleTooltip
                key={cape.textureId}
                display={
                  <span>
                    <b>{cape.name ?? "Unknown"}</b> Cape
                  </span>
                }
              >
                <Image
                  src={cape.parts.FRONT}
                  alt={`${player.username} cape`}
                  width={64 * CAPE_ASPECT_RATIO}
                  height={64}
                  className="h-[64px] rounded-sm object-cover"
                />
              </SimpleTooltip>
            ))}
          </>
        ) : (
          <div className="flex h-full min-h-[64px] flex-col items-center justify-center">
            <p className="text-muted-foreground text-center text-sm">No capes available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
