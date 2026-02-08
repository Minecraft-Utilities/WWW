"use client";

import { cn } from "@/common/utils";
import { useSelectedSkin } from "@/components/provider/selected-skin-provider";
import { Skin3DSettingsProvider } from "@/components/provider/skin-3d-settings-provider";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { Player } from "mcutils-js-api/dist/types/player/player";
import { SkinPart } from "mcutils-js-api/dist/types/player/skin/skin-part";
import Image from "next/image";
import { useState } from "react";
import PlayerSkin3D from "./player-skin-3d";
import Skin3DButtons from "./skin-3d-buttons";

const SKIN_PARTS: SkinPart[] = ["HEAD", "FACE", "BODY", "FULLBODY_FRONT", "FULLBODY_BACK"];
const SKIN_MODES = ["3D", "2D"];

export interface PlayerSkinProps {
  player: Player;
}

export default function PlayerSkin({ player }: PlayerSkinProps) {
  const { selectedSkin } = useSelectedSkin();

  const [selectedMode, setSelectedMode] = useState<(typeof SKIN_MODES)[number]>("3D");
  const [selectedPart, setSelectedPart] = useState<SkinPart>("FULLBODY_FRONT");

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader>Skin</CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative flex h-72 w-full items-center justify-center overflow-hidden">
          {selectedMode === "2D" && (
            <Image
              src={selectedSkin.parts[selectedPart]}
              alt={`${player.username} skin - ${selectedPart}`}
              width={256}
              height={256}
              className="max-h-full max-w-full object-contain"
              unoptimized
            />
          )}
          {selectedMode === "3D" && (
            <Skin3DSettingsProvider player={player}>
              <PlayerSkin3D player={player} />
              <Skin3DButtons player={player} />
            </Skin3DSettingsProvider>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <SkinSelectionButton selected={selectedMode === "3D"} onClick={() => setSelectedMode("3D")}>
            <p className="font-bold">3D</p>
          </SkinSelectionButton>

          {SKIN_PARTS.map(key => {
            return (
              <SkinSelectionButton
                key={key}
                selected={selectedPart === key && selectedMode === "2D"}
                onClick={() => {
                  setSelectedPart(key);
                  setSelectedMode("2D");
                }}
              >
                <Image
                  src={player.skin.parts[key]}
                  alt={key}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain object-center p-1.5"
                  unoptimized
                />
              </SkinSelectionButton>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

interface SkinSelectionButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

function SkinSelectionButton({ children, selected, onClick }: SkinSelectionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-muted/30 flex overflow-hidden rounded-lg border-2 transition-colors",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        "size-10 items-center justify-center",
        selected ? "border-primary" : "border-border/60 hover:border-border"
      )}
    >
      {children}
    </button>
  );
}
