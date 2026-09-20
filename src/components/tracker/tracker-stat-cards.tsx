import type { TrackerStats } from "@/common/tracker";
import { formatNumberWithCommas } from "@/common/utils";
import SimpleTooltip from "@/components/simple-tooltip";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { ServerIcon, UsersIcon, WifiIcon } from "lucide-react";

interface TrackerStatCardsProps {
  stats: TrackerStats;
}

interface StatDefinition {
  label: string;
  value: number;
  icon: React.ReactNode;
  explanation: string;
}

export default function TrackerStatCards({ stats }: TrackerStatCardsProps) {
  const definitions: StatDefinition[] = [
    {
      label: "Tracked Servers",
      value: stats.trackedServers,
      icon: <ServerIcon className="text-primary size-5" />,
      explanation: "Total public Java servers discovered by the tracker, including honeypot-flagged ones.",
    },
    {
      label: "Tracked Players",
      value: stats.trackedPlayers,
      icon: <UsersIcon className="text-primary size-5" />,
      explanation: "Distinct players ever seen online across all tracked servers.",
    },
    {
      label: "Online Players",
      value: stats.onlinePlayers,
      icon: <WifiIcon className="text-primary size-5" />,
      explanation: "Players currently online across alive, non-honeypot tracked servers.",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      {definitions.map(definition => (
        <Card key={definition.label} className="w-full">
          <CardHeader>{definition.label}</CardHeader>
          <CardContent className="flex items-center justify-between gap-2">
            <SimpleTooltip display={<p>{definition.explanation}</p>} className="justify-start">
              <p className="text-foreground text-3xl font-semibold tracking-tight tabular-nums">
                {formatNumberWithCommas(definition.value)}
              </p>
            </SimpleTooltip>
            {definition.icon}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
