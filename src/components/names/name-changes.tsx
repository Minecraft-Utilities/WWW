"use client";

import { env } from "@/common/env";
import { formatDate } from "@/common/time-utils";
import SimpleLink from "@/components/simple-link";
import SimpleTooltip from "@/components/simple-tooltip";
import TimeAgo from "@/components/time-ago";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import { RecentUsernameChange } from "mcutils-js-api/dist/types/player/recent-username-change";
import Image from "next/image";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const TOTAL_NAME_CHANGES_TO_SHOW = 50;

export default function NameChanges({
  nameChanges: initialNameChanges,
}: {
  nameChanges: RecentUsernameChange[];
}) {
  const [nameChanges, setNameChanges] = useState<RecentUsernameChange[]>(initialNameChanges);

  const { lastJsonMessage } = useWebSocket<RecentUsernameChange>(
    "wss://mc.fascinated.cc/api/ws/name-changes",
    {
      reconnectAttempts: 1000000000,
      reconnectInterval: 1000,
      retryOnError: true,
    }
  );

  useEffect(() => {
    if (lastJsonMessage) {
      setNameChanges(prev => [lastJsonMessage, ...prev].slice(0, TOTAL_NAME_CHANGES_TO_SHOW));
    }
  }, [lastJsonMessage]);

  return (
    <Card className="w-full max-w-[980px] overflow-hidden p-0">
      <CardHeader>Name Changes</CardHeader>
      <CardContent className="p-0">
        <div className="divide-border/60 divide-y">
          {nameChanges.map(change => (
            <div key={change.playerId} className="flex items-center gap-2 px-3 py-2">
              <SimpleLink href={`/player/${change.newUsername}`}>
                <Image
                  src={`${env.NEXT_PUBLIC_API_URL}/skins/${change.newUsername}/face.png`}
                  alt={change.newUsername}
                  width={22}
                  height={22}
                  className="rounded-sm"
                />
              </SimpleLink>

              <div className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
                <span className="text-muted-foreground truncate">{change.previousUsername}</span>
                <ArrowRightIcon className="text-muted-foreground size-3 shrink-0" aria-hidden />
                <SimpleLink
                  href={`/player/${change.newUsername}`}
                  className="text-foreground font-medium hover:underline"
                >
                  {change.newUsername}
                </SimpleLink>
              </div>

              <SimpleTooltip
                display={`Name change seen on ${formatDate(new Date(change.timestamp), "Do MMMM, YYYY HH:mm a")}`}
              >
                <span className="text-muted-foreground shrink-0 text-xs">
                  <TimeAgo date={new Date(change.timestamp)} />
                </span>
              </SimpleTooltip>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
