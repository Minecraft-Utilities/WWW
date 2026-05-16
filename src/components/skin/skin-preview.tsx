import { DownloadIcon } from "lucide-react";
import { Skin } from "mcutils-js-api/dist/types/player/skin/skin";
import Card, { CardContent } from "../ui/card";
import DownloadFileButton from "../ui/download-file-button";

interface SkinPreviewProps {
  skin: Skin;
}

export default function SkinPreview({ skin }: SkinPreviewProps) {
  return (
    <Card className="h-fit w-full">
      <CardContent className="relative flex items-center justify-center">
        <img src={skin.parts.FULLBODY_ISO_FRONT} alt={skin.id} className="h-96" />
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
