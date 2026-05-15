import { DownloadIcon } from "lucide-react";
import { Cape } from "mcutils-js-api/dist/types/player/cape/cape";
import Image from "next/image";
import Card, { CardContent } from "../ui/card";
import DownloadFileButton from "../ui/download-file-button";

interface CapePreviewProps {
  cape: Cape;
}

const CAPE_ASPECT_RATIO = 480 / 768;
const PREVIEW_HEIGHT = 240;
const PREVIEW_WIDTH = Math.round(PREVIEW_HEIGHT * CAPE_ASPECT_RATIO);

export default function CapePreview({ cape }: CapePreviewProps) {
  return (
    <Card className="h-fit w-full">
      <CardContent className="group relative flex items-center justify-center p-4">
        <Image
          src={cape.parts.ISO}
          alt={cape.name ?? cape.id}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
          className="object-contain"
          sizes="200px"
          priority
        />
        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
          <DownloadFileButton
            href={`https://textures.minecraft.net/texture/${cape.textureId}`}
            filename={`${cape.textureId}.png`}
          >
            <DownloadIcon className="size-4" />
          </DownloadFileButton>
        </div>
      </CardContent>
    </Card>
  );
}
