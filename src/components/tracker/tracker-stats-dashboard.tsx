"use client";

import { fetchTrackerStats, type TrackerStats } from "@/common/tracker";
import { capitalize } from "@/common/utils";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { countryFlag, countryLabel, protocolLabel } from "./chart-utils";
import PieBreakdown from "./pie-breakdown";
import TrackerStatCards from "./tracker-stat-cards";

export const TRACKER_STATS_QUERY_KEY = ["trackerStats"] as const;

function buildLabels(
  breakdown: Record<string, number>,
  format: (key: string) => string
): Record<string, string> {
  return Object.fromEntries(Object.keys(breakdown).map(key => [key, format(key)]));
}

export default function TrackerStatsDashboard({ initialStats }: { initialStats: TrackerStats }) {
  // The QueryProvider default polls every 60s; `initialData` keeps the server-rendered
  // snapshot visible until the first fresh response arrives.
  const { data: stats = initialStats } = useQuery({
    queryKey: TRACKER_STATS_QUERY_KEY,
    queryFn: () => fetchTrackerStats({ cache: "no-store" }),
    initialData: initialStats,
    staleTime: 0,
  });

  return (
    <div className="flex w-full max-w-[980px] flex-col gap-4">
      <TrackerStatCards stats={stats} />

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="w-full">
          <CardHeader>Platforms</CardHeader>
          <CardContent>
            <PieBreakdown
              data={stats.platform}
              labels={buildLabels(stats.platform, capitalize)}
              centerLabel="servers tracked"
              emptyMessage="No platform data yet. The tracker is still discovering server software."
            />
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>Protocol Versions</CardHeader>
          <CardContent>
            <PieBreakdown
              data={stats.protocol}
              labels={buildLabels(stats.protocol, protocolLabel)}
              centerLabel="servers"
              emptyMessage="No protocol data yet. The tracker is still discovering server versions."
              tooltipMode="protocol"
            />
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>Geography</CardHeader>
          <CardContent>
            <PieBreakdown
              data={stats.geo}
              labels={buildLabels(stats.geo, code => {
                const flag = countryFlag(code);
                return flag ? `${flag} ${countryLabel(code)}` : countryLabel(code);
              })}
              centerLabel="servers"
              emptyMessage="No geographic data yet. The tracker is still resolving server locations."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
