import { Player } from "mcutils-js-api/dist/types/player/player";
import DetailRow from "../detail-row";
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
      </CardContent>
    </Card>
  );
}
