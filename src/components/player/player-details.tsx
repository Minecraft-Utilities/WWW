"use client";

import { timeAgo } from "@/common/time-utils";
import { cn } from "@/common/utils";
import { BugIcon } from "lucide-react";
import { Player } from "mcutils-js-api/dist/types/player/player";
import { useState } from "react";
import DetailRow from "../detail-row";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface PlayerDetailsProps {
  player: Player;
}

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  const [showDebug, setShowDebug] = useState(false);

  return (
    <Card className="h-fit w-full overflow-hidden p-0">
      <CardHeader className="flex items-center justify-between">
        <span>Details</span>
        <SimpleTooltip display={showDebug ? "Hide hidden details" : "Show hidden details"}>
          <BugIcon
            className={cn("size-4", showDebug ? "text-primary" : "text-muted-foreground")}
            onClick={() => setShowDebug(!showDebug)}
          />
        </SimpleTooltip>
      </CardHeader>
      <CardContent className="flex flex-col">
        <DetailRow label="UUID" value={player.uniqueId} />
        <DetailRow label="Username" value={player.username} />
        <DetailRow label="Legacy Account" value={player.legacyAccount ? "Yes" : "No"} />
        {showDebug && (
          <>
            <DetailRow label="Last Updated" value={timeAgo(player.lastUpdated)} />
            <DetailRow label="First Seen" value={timeAgo(player.firstSeen)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
