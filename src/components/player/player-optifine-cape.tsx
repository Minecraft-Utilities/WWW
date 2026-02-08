import { Player } from "mcutils-js-api/dist/types/player/player";
import Image from "next/image";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerOptifineCapeProps {
  player: Player;
}

export default function PlayerOptifineCape({ player }: PlayerOptifineCapeProps) {
  const optifineCape = player.optifineCape;

  if (!optifineCape) {
    return null;
  }

  return (
    <Card className="h-fit min-w-48 overflow-hidden p-0">
      <CardHeader>Optifine Cape</CardHeader>
      <CardContent className="flex h-full items-center justify-center gap-2">
        {/* Optifine Cape */}
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
      </CardContent>
    </Card>
  );
}
