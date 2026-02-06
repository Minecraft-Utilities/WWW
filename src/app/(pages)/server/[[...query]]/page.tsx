import { mcUtilsApi } from "@/common/mc-utils";
import { capitalize, formatNumberWithCommas } from "@/common/utils";
import { ServerDetails } from "@/components/server/server-details";
import ServerDnsRecords from "@/components/server/server-dns-records";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";
import type { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import type { ServerType } from "mcutils-js-api/dist/types/server/server";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    query?: string[];
  }>;
};

async function getServer(query: string[] | undefined) {
  const edition = query?.[0] as ServerType;
  const hostname = query?.[1];

  if (!hostname) {
    return { server: undefined, error: undefined };
  }

  const { server, error } = await mcUtilsApi.fetchServer(decodeURIComponent(hostname), edition);

  return { server, error, edition };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
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
    title: `${server.hostname} - ${capitalize(edition!)} Server`,
    icons: {
      ...(favicon ? { icon: favicon } : {}),
    },
    openGraph: {
      ...(favicon ? { images: [{ url: favicon }] } : {}),
      description: `${formatNumberWithCommas(players.online)}/${formatNumberWithCommas(players.max)} players online`,
    },
  };
}

export default async function ServerPage({ params }: Props) {
  const { query } = await params;
  const { server, error, edition } = await getServer(query);

  return (
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
          <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              {edition === "java" && (server as JavaServer).favicon?.base64 && (
                <Image
                  src={(server as JavaServer).favicon!.base64!}
                  alt={`${server.hostname} favicon`}
                  width={64}
                  height={64}
                  className="rounded-md"
                  unoptimized
                />
              )}

              <h1 className="text-foreground min-w-0 text-center text-4xl font-bold tracking-tight wrap-break-word">
                {server.hostname}
              </h1>
            </div>
          </header>

          <div className="flex flex-col gap-4">
            {/* MOTD preview (Java only) */}
            {edition === "java" && (server as JavaServer).motd?.preview && (
              <section className="flex flex-col gap-4">
                <Card className="h-fit items-center overflow-hidden p-0">
                  <CardContent className="flex items-center justify-center">
                    <Image
                      src={(server as JavaServer).motd!.preview!}
                      alt={`${server.hostname} MOTD preview`}
                      width={768}
                      height={128}
                      unoptimized
                      className="object-contain"
                    />
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Details */}
            <section className="flex flex-col gap-4">
              <Card className="flex w-full min-w-0 flex-col overflow-hidden p-0">
                <CardHeader>Details</CardHeader>
                <CardContent>
                  <ServerDetails server={server} edition={edition} />
                </CardContent>
              </Card>
            </section>

            {/* DNS records (collapsible) */}
            {server.records && server.records.length > 0 && (
              <section className="flex flex-col gap-4">
                <Card className="flex w-full min-w-0 flex-col overflow-hidden p-0">
                  <CardHeader>DNS Records</CardHeader>
                  <CardContent>
                    <ServerDnsRecords records={server.records} />
                  </CardContent>
                </Card>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InvalidServer({ error }: { error?: ErrorResponse }) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Card className="border-destructive/50 bg-destructive/10 w-full max-w-xl overflow-hidden p-0">
        <CardHeader variant="destructive">Error</CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{error?.message ?? "Invalid address"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
