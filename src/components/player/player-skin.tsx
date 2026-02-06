"use client";

import { Skin } from "mcutils-js-api/dist/types/player/skin/skin";
import { SkinPart } from "mcutils-js-api/dist/types/player/skin/skin-part";
import Image from "next/image";
import { useState } from "react";
import Card from "../ui/card";
import { cn } from "@/common/utils";

const SKIN_PARTS: SkinPart[] = [
  "HEAD",
  "FACE",
  "BODY",
  "FULLBODY_FRONT",
  "FULLBODY_BACK",
];

type Props = {
  skin: Skin;
  username: string;
};

export default function PlayerSkin({ skin, username }: Props) {
  const [selectedPart, setSelectedPart] = useState<SkinPart>("FULLBODY_FRONT");

  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <div className="border-b border-border/60 bg-muted/20 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Skin
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 p-4">
        <div className="relative flex h-72 w-full max-w-[280px] items-center justify-center overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border/50">
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
          {SKIN_PARTS.map((key) => {
            const partImgUrl = skin.parts[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedPart(key)}
                className={cn(
                  "flex overflow-hidden rounded-lg border-2 bg-muted/30 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "size-14",
                  selectedPart === key
                    ? "border-primary"
                    : "border-border/60 hover:border-border",
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
      </div>
    </Card>
  );
}
