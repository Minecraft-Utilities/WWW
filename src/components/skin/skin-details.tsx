import { formatNumberWithCommas } from "@/common/utils";
import { Skin } from "mcutils-js-api/dist/types/player/skin/skin";
import SimpleLink from "../simple-link";
import Card, { CardContent, CardHeader } from "../ui/card";

interface SkinDetailsProps {
  skin: Skin;
}

export default function SkinDetails({ skin }: SkinDetailsProps) {
  return (
    <Card className="h-fit w-full overflow-hidden p-0">
      <CardHeader>Details</CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">First Seen Using</span>
          <SimpleLink href={`/player/${skin.firstSeenUsing}`} className="text-sm font-medium">
            {skin.firstSeenUsing}
          </SimpleLink>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total Users</span>
          <span className="border-primary/20 bg-primary/10 rounded-md border px-2 py-1 font-mono text-sm">
            {formatNumberWithCommas(skin.accountsUsed)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
