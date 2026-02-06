import { timeAgo } from "@/common/time-utils";
import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";
import DetailRow from "../detail-row";
import Card, { CardContent, CardHeader } from "../ui/card";

export default function PlayerDetails({ player }: { player: CachedPlayer }) {
  return (
    <Card className="flex h-fit w-full flex-col overflow-hidden p-0">
      <CardHeader>Details</CardHeader>
      <CardContent className="flex flex-col gap-0">
        <DetailRow label="UUID" value={player.uniqueId} />
        <DetailRow label="Username" value={player.username} />
        <DetailRow label="Legacy Account" value={player.legacyAccount ? "Yes" : "No"} />
        <DetailRow label="Cached" value={player.cached ? timeAgo(new Date(player.cachedTime)) : "No"} />
      </CardContent>
    </Card>
  );
}
