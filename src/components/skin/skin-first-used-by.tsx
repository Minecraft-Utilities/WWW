import { SkinDTO } from "mcutils-js-api/dist/types/response/skin/skin-dto";
import SimpleLink from "../simple-link";

import Card, { CardContent, CardHeader } from "../ui/card";

type SkinFirstUsedByProps = {
  skin: SkinDTO;
};

export default function SkinFirstUsedBy({ skin }: SkinFirstUsedByProps) {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <p>First Used By</p>
      </CardHeader>
      <CardContent>
        <SimpleLink href={`/player/${skin.firstSeenUsing}`}>
          <p>{skin.firstSeenUsing}</p>
        </SimpleLink>
      </CardContent>
    </Card>
  );
}
