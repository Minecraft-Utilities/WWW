import { DownloadIcon } from "lucide-react";
import { Skin } from "mcutils-js-api/dist/types/player/skin/skin";
import Image from "next/image";
import Card, { CardContent, CardHeader } from "../ui/card";
import DownloadFileButton from "../ui/download-file-button";

interface SkinPreviewProps {
  skin: Skin;
}

const SKIN_ASPECT_RATIO = 452 / 768;
const PREVIEW_WIDTH = 320 * SKIN_ASPECT_RATIO;
const PREVIEW_HEIGHT = 320;

export default function SkinPreview({ skin }: SkinPreviewProps) {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <p>Skin</p>
      </CardHeader>
      <CardContent className="relative flex items-center justify-center">
        <Image
          src={skin.parts.FULLBODY_ISO_FRONT}
          alt={skin.id}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
          sizes="(max-width: 640px) 100vw, 188px"
          priority
        />
        <div className="absolute top-2 right-2">
          <DownloadFileButton
            href={`https://textures.minecraft.net/texture/${skin.textureId}`}
            filename={`${skin.textureId}.png`}
          >
            <DownloadIcon className="size-4" />
          </DownloadFileButton>
        </div>
      </CardContent>
    </Card>
  );
}
