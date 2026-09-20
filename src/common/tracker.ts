import { env } from "./env";

/**
 * Public statistics of the internet server tracker.
 *
 * Mirrors the `TrackerStatsResponse` DTO of the backend API:
 * https://mc.fascinated.cc/api/servers/tracker/stats
 */
export interface TrackerStats {
  /** Total servers in `tracked_servers` (incl. honeypot-flagged ones) */
  trackedServers: number;
  /** Distinct players ever seen across all tracked servers */
  trackedPlayers: number;
  /** Sum of `online_count` over alive, non-honeypot servers */
  onlinePlayers: number;
  /** Top-10 country ISO code -> server count */
  geo: Record<string, number>;
  /** Top-10 server-software (lowercased) -> server count, plain versions bucketed as `unknown` */
  platform: Record<string, number>;
  /** Top-10 status-protocol number -> server count */
  protocol: Record<string, number>;
}

/** The API caches the stats snapshot for 60s; reuse the cached copy for the same period. */
export const STATS_REVALIDATE_SECONDS = 60;

/** Fetch options, extended with Next's server-side cache controls. */
export interface TrackerStatsFetchOptions extends RequestInit {
  next?: { revalidate?: number };
}

/**
 * Fetches the current tracker stats snapshot from the API.
 *
 * @param options optional fetch options (eg: `next: { revalidate: 60 }` on the server,
 *                `{ cache: "no-store" }` when polling from the client)
 * @returns the parsed stats
 * @throws if the endpoint is unreachable or returns an error status
 */
export async function fetchTrackerStats(options?: TrackerStatsFetchOptions): Promise<TrackerStats> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/servers/tracker/stats`, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch server tracker stats (HTTP ${response.status})`);
  }

  return (await response.json()) as TrackerStats;
}
