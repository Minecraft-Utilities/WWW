"use client";

import { cn } from "@/common/utils";
import { Skin } from "mcutils-js-api/dist/types/player/skin/skin";
import { SkinPart } from "mcutils-js-api/dist/types/player/skin/skin-part";
import Image from "next/image";
import { useState } from "react";
import Card, { CardContent, CardHeader } from "../ui/card";

const SKIN_PARTS: SkinPart[] = ["HEAD", "FACE", "BODY", "FULLBODY_FRONT", "FULLBODY_BACK"];

export interface PlayerSkinProps {
  skin: Skin;
  username: string;
}

export default function PlayerSkin({ skin, username }: PlayerSkinProps) {
  const [selectedPart, setSelectedPart] = useState<SkinPart>("FULLBODY_FRONT");

  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <CardHeader>Skin</CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-muted/40 ring-border/50 relative flex h-72 w-full max-w-[280px] items-center justify-center overflow-hidden rounded-xl ring-1">
          <Image
            src={skin.parts[selectedPart]}
            alt={`${username} skin - ${selectedPart}`}
            width={256}
            height={256}
            unoptimized
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {SKIN_PARTS.map(key => {
            const partImgUrl = skin.parts[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedPart(key)}
                className={cn(
                  "bg-muted/30 flex overflow-hidden rounded-lg border-2 transition-colors",
                  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                  "size-14",
                  selectedPart === key ? "border-primary" : "border-border/60 hover:border-border"
                )}
              >
                <Image
                  src={partImgUrl}
                  alt={key}
                  width={56}
                  height={56}
                  unoptimized
                  className="h-full w-full object-contain object-center"
                />
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
