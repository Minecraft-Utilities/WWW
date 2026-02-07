import { mcUtilsApi } from "@/common/mc-utils";
import { capitalize, formatNumberWithCommas } from "@/common/utils";
import Background from "@/components/background";
import { ServerDetails } from "@/components/server/server-details";
import ServerDnsRecords from "@/components/server/server-dns-records";
import ServerHeader from "@/components/server/server-header";
import ServerMotd from "@/components/server/server-motd";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { ServerPlatform } from "mcutils-js-api/dist/types/server/server";
import { Metadata } from "next";
import { cache } from "react";

export const dynamic = "force-dynamic";

const fetchServerCached = cache((hostname: string, edition: ServerPlatform) =>
  mcUtilsApi.fetchServer(hostname, edition)
);

export interface ServerPageProps {
  params: Promise<{
    query?: string[];
  }>;
}

async function getServer(query: string[] | undefined) {
  const edition = query?.[0] as ServerPlatform;
  const hostname = query?.[1];

  if (!hostname) {
    return { server: undefined, error: undefined };
  }

  const { server, error } = await fetchServerCached(decodeURIComponent(hostname), edition);
  return { server, error, edition };
}

export async function generateMetadata(props: ServerPageProps): Promise<Metadata> {
  const { query } = await props.params;
  const { server, error, edition } = await getServer(query);

  if (error || !server) {
    return {
      title: "Server not found",
      description: "Server not found",
      openGraph: {
        title: "Server not found",
        description: "Server not found",
      },
    };
  }
  const favicon = "favicon" in server ? server.favicon?.url : undefined;
  const players = server.players;

  return {
    title: `${server.registryEntry?.displayName ?? server.hostname} - ${capitalize(edition!)} Server`,
    icons: {
      ...(favicon ? { icon: favicon } : {}),
    },
    openGraph: {
      ...(favicon ? { images: [{ url: favicon }] } : {}),
      description: `${formatNumberWithCommas(players.online)}/${formatNumberWithCommas(players.max)} players online`,
    },
  };
}

export default async function ServerPage({ params }: ServerPageProps) {
  const { query } = await params;
  const { server, error, edition } = await getServer(query);
  const serverBackground = server?.registryEntry
    ? server.registryEntry.backgroundImageUrl
    : "https://cdn.fascinated.cc/wjLURHpJ.jpg";

  return (
    <>
      <Background url={serverBackground} />
      <div className="mt-24 flex w-full flex-col items-center gap-6">
        {(error || !server) && (
          <Card className="border-destructive/50 bg-destructive/10 w-full max-w-xl overflow-hidden p-0">
            <CardHeader variant="destructive">Error</CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{error?.message ?? "Invalid lookup parameters"}</p>
            </CardContent>
          </Card>
        )}

        {server && (
          <div className="flex w-full max-w-3xl flex-col gap-24">
            {/* Header */}
            <ServerHeader server={server} edition={edition} />

            <div className="flex flex-col gap-4">
              {/* MOTD preview (Java only) */}
              <ServerMotd server={server} edition={edition} />

              {/* Details */}
              <ServerDetails server={server} edition={edition} />

              {/* DNS records (collapsible) */}
              <ServerDnsRecords records={server.records} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
