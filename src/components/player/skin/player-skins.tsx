"use client";

import { timeAgo } from "@/common/time-utils";
import { cn } from "@/common/utils";
import { Player } from "mcutils-js-api/dist/types/player/player";
import Image from "next/image";
import { useSelectedSkin } from "../../provider/selected-skin-provider";
import SimpleTooltip from "../../simple-tooltip";
import Card, { CardContent, CardHeader } from "../../ui/card";

export interface PlayerSkinsProps {
  player: Player;
}

export default function PlayerSkins({ player }: PlayerSkinsProps) {
  const { selectedSkin, setSelectedSkin } = useSelectedSkin();
  const skins =
    player.skinHistory?.sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()) ?? [];

  return (
    <Card className="h-fit min-w-48 overflow-hidden p-0">
      <CardHeader>Skins ({skins.length})</CardHeader>
      <CardContent className="flex h-full items-center justify-center gap-2">
        {skins.map(skin => {
          const isSelected = selectedSkin?.textureId === skin.textureId;

          return (
            <SimpleTooltip
              display={
                <div className="flex flex-col gap-2">
                  <p className={cn("text-sm font-medium", isSelected ? "text-primary" : "")}>
                    {isSelected ? "Currently selected" : "Click to select"}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-4 text-xs">
                      <span className="text-muted-foreground">Last used</span>
                      <span className="font-medium">
                        {player.skin.textureId === skin.textureId ? "Current" : timeAgo(skin.lastUsed)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-xs">
                      <span className="text-muted-foreground">First seen</span>
                      <span className="font-medium">{timeAgo(skin.firstSeen)}</span>
                    </div>
                  </div>
                </div>
              }
              key={skin.textureId}
            >
              <button onClick={() => setSelectedSkin(skin)}>
                <Image
                  key={skin.textureId}
                  src={skin.parts.FACE}
                  alt={`${player.username}'s skin`}
                  width={38}
                  height={38}
                  className={cn("rounded-sm object-cover", isSelected ? "border-primary border-2" : "")}
                />
              </button>
            </SimpleTooltip>
          );
        })}
      </CardContent>
    </Card>
  );
}
