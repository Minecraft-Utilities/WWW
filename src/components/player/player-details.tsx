import { Player } from "mcutils-js-api/dist/types/player/player";
import Card, { CardHeader } from "../ui/card";
import DetailRow from "../detail-row";
import { timeAgo } from "@/common/time-utils";
import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";

export default function PlayerDetails({ player }: { player: CachedPlayer }) {
  return (
    <Card className="flex flex-col h-fit w-full overflow-hidden p-0">
      <CardHeader>Details</CardHeader>
      <div className="flex flex-col gap-0 p-4">
        <DetailRow label="UUID" value={player.uniqueId} />
        <DetailRow label="Username" value={player.username} />
        <DetailRow
          label="Legacy Account"
          value={player.legacyAccount ? "Yes" : "No"}
        />
        <DetailRow
          label="Cached"
          value={player.cached ? timeAgo(new Date(player.cachedTime)) : "No"}
        />
      </div>
    </Card>
  );
}
