import Image from "next/image";
import { CardContent, CardHeader } from "../ui/card";

import { SkinDTO } from "mcutils-js-api/dist/types/response/skin/skin-dto";
import Card from "../ui/card";

interface SkinPreviewProps {
  skin: SkinDTO;
}

const SKIN_ASPECT_RATIO = 452 / 768;

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
          width={320 * SKIN_ASPECT_RATIO}
          height={0}
          priority
          unoptimized
        />
      </CardContent>
    </Card>
  );
}
