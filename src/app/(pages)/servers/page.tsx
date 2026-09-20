import { fetchTrackerStats, STATS_REVALIDATE_SECONDS, type TrackerStats } from "@/common/tracker";
import TrackerStatsDashboard from "@/components/tracker/tracker-stats-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Tracker Stats",
  description:
    "Live statistics of the MC Utils internet server tracker: tracked servers, online players, server software, protocol versions, and geography.",
};

export default async function TrackerStatsPage() {
  const stats: TrackerStats = await fetchTrackerStats({ next: { revalidate: STATS_REVALIDATE_SECONDS } });

  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-10">
      <header className="w-full max-w-[980px]">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">Server Tracker Stats</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Live statistics of the Minecraft servers we track: their software, versions, and locations.
        </p>
      </header>

      <TrackerStatsDashboard initialStats={stats} />
    </div>
  );
}
