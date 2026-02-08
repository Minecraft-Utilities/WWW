import { env } from "@/common/env";
import { Player } from "mcutils-js-api/dist/types/player/player";
import DetailRow from "../detail-row";
import SimpleLink from "../simple-link";
import { Button } from "../ui/button";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerDetailsProps {
  player: Player;
}

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  return (
    <Card className="h-fit w-full overflow-hidden p-0">
      <CardHeader>Details</CardHeader>
      <CardContent className="flex flex-col">
        <DetailRow label="UUID" value={player.uniqueId} />
        <DetailRow label="Username" value={player.username} />
        <DetailRow label="Legacy Account" value={player.legacyAccount ? "Yes" : "No"} />

        {/* Open API Link */}
        <SimpleLink href={`${env.NEXT_PUBLIC_API_URL}/players/${player.uniqueId}`}>
          <Button variant="outline" size="sm">
            View API
          </Button>
        </SimpleLink>
      </CardContent>
    </Card>
  );
}
