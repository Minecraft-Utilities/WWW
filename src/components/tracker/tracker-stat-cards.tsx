import type { TrackerStats } from "@/common/tracker";
import { formatNumberWithCommas } from "@/common/utils";
import Card, { CardContent, CardHeader } from "@/components/ui/card";

interface TrackerStatCardsProps {
  stats: TrackerStats;
}

interface StatDefinition {
  label: string;
  value: number;
}

export default function TrackerStatCards({ stats }: TrackerStatCardsProps) {
  const definitions: StatDefinition[] = [
    {
      label: "Tracked Servers",
      value: stats.trackedServers,
    },
    {
      label: "Tracked Players",
      value: stats.trackedPlayers,
    },
    {
      label: "Online Players",
      value: stats.onlinePlayers,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      {definitions.map(definition => (
        <Card key={definition.label} className="w-full">
          <CardHeader>{definition.label}</CardHeader>
          <CardContent>
            <p className="text-foreground text-3xl font-semibold tracking-tight tabular-nums">
              {formatNumberWithCommas(definition.value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
