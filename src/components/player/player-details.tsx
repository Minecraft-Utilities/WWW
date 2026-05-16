"use client";

import { cn, formatNumberWithCommas } from "@/common/utils";
import { BugIcon } from "lucide-react";
import { FullPlayer } from "mcutils-js-api/dist/types/player/player";
import { useState } from "react";
import DetailRow from "../detail-row";
import SimpleTooltip from "../simple-tooltip";
import TimeAgo from "../time-ago";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerDetailsProps {
  player: FullPlayer;
}

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  const [showDebug, setShowDebug] = useState(false);

  return (
    <Card className="h-fit w-full overflow-hidden p-0">
      <CardHeader className="flex items-center justify-between">
        <span>Details</span>
        <SimpleTooltip display={showDebug ? "Hide hidden details" : "Show hidden details"}>
          <BugIcon
            className={cn(
              "hover:text-primary size-4 cursor-pointer transition-colors duration-200",
              showDebug ? "text-primary" : "text-muted-foreground"
            )}
            onClick={() => setShowDebug(!showDebug)}
          />
        </SimpleTooltip>
      </CardHeader>
      <CardContent className="flex flex-col">
        <DetailRow label="UUID" value={player.uniqueId} copyable />
        <DetailRow label="Username" value={player.username} copyable />
        <DetailRow label="Legacy Account" value={player.legacyAccount ? "Yes" : "No"} />
        <DetailRow label="Submitted UUIDs" value={formatNumberWithCommas(player.submittedUuids)} />
        {showDebug && (
          <>
            <DetailRow label="Last Updated" value={<TimeAgo date={new Date(player.lastUpdated)} />} />
            <DetailRow label="First Seen" value={<TimeAgo date={new Date(player.firstSeen)} />} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
