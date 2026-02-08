"use client";

import { cn } from "@/common/utils";
import { Player } from "mcutils-js-api/dist/types/player/player";
import Image from "next/image";
import { useSelectedSkin } from "../provider/selected-skin-provider";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerSkinsProps {
  player: Player;
}

export default function PlayerSkins({ player }: PlayerSkinsProps) {
  const { selectedSkin, setSelectedSkin } = useSelectedSkin();
  const skins = player.skinHistory ?? [];

  return (
    <Card className="h-fit min-w-48 overflow-hidden p-0">
      <CardHeader>Skins ({skins.length})</CardHeader>
      <CardContent className="flex h-full items-center justify-center gap-2">
        {skins.map(skin => {
          const isSelected = selectedSkin?.textureId === skin.textureId;

          return (
            <SimpleTooltip
              display={isSelected ? "Currently selected skin" : "Click to select this skin"}
              key={skin.textureId}
            >
              <button onClick={() => setSelectedSkin(skin)}>
                <Image
                  key={skin.textureId}
                  src={skin.parts.FACE + "?overlays=false"}
                  alt={`${player.username}'s skin`}
                  width={38}
                  height={38}
                  className={cn("rounded-sm border-2 object-cover", isSelected ? "border-primary" : "")}
                  unoptimized
                />
              </button>
            </SimpleTooltip>
          );
        })}
      </CardContent>
    </Card>
  );
}
