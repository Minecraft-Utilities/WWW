import Image from "next/image";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardHeader } from "../ui/card";
import { Player } from "mcutils-js-api/dist/types/player/player";

export interface PlayerCapesProps {
  player: Player;
}

export default function PlayerCapes({ player }: PlayerCapesProps) {
  const cape = player.cape;
  const optifineCape = player.optifineCape;

  return (
    <Card className="h-fit min-w-48 overflow-hidden p-0">
      <CardHeader>Cape</CardHeader>
      <CardContent className="flex h-full items-center justify-center gap-2">
        {cape || optifineCape ? (
          <>
            {/* Vanilla Cape */}
            {cape && (
              <SimpleTooltip
                display={
                  <span>
                    <b>{cape.name ?? "Unknown"}</b> Cape
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
            )}

            {/* Optifine Cape */}
            {optifineCape && (
              <SimpleTooltip
                display={
                  <span>
                    <b>Optifine</b> Cape
                  </span>
                }
              >
                <Image
                  src={optifineCape.parts.FRONT}
                  alt={`${player.username} optifine cape`}
                  width={64}
                  height={105}
                  className="h-[105px] rounded-lg object-cover"
                  unoptimized
                />
              </SimpleTooltip>
            )}
          </>
        ) : (
          <div className="flex h-full min-h-[105px] flex-col items-center justify-center">
            <p className="text-muted-foreground text-center text-sm">No capes available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
