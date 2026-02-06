import { env } from "@/common/env";
import { timeAgo } from "@/common/time-utils";
import { CachedPlayer } from "mcutils-js-api/dist/types/cache/cached-player";
import DetailRow from "../detail-row";
import SimpleLink from "../simple-link";
import { Button } from "../ui/button";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerDetailsProps {
  player: CachedPlayer;
}

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  return (
    <Card className="flex h-fit w-full flex-col overflow-hidden p-0">
      <CardHeader>Details</CardHeader>
      <CardContent className="flex flex-col gap-0">
        <DetailRow label="UUID" value={player.uniqueId} />
        <DetailRow label="Username" value={player.username} />
        <DetailRow label="Legacy Account" value={player.legacyAccount ? "Yes" : "No"} />
        <DetailRow label="Cached" value={player.cached ? timeAgo(new Date(player.cachedTime)) : "No"} />

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
