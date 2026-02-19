import Image from "next/image";
import { CardContent, CardHeader } from "../ui/card";

import { SkinDTO } from "mcutils-js-api/dist/types/response/skin/skin-dto";
import Card from "../ui/card";

interface SkinPreviewProps {
  skin: SkinDTO;
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
      <CardContent className="flex items-center justify-center">
        <Image
          src={skin.imageUrl}
          alt={skin.id}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
          sizes="(max-width: 640px) 100vw, 188px"
          priority
        />
      </CardContent>
    </Card>
  );
}
