import { mcUtilsApi } from "@/common/mc-utils";
import { capitalize, formatNumberWithCommas } from "@/common/utils";
import { ServerDetails } from "@/components/server/server-details";
import ServerDnsRecords from "@/components/server/server-dns-records";
import Card, { CardHeader } from "@/components/ui/card";
import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";
import { BedrockServer } from "mcutils-js-api/dist/types/server/impl/bedrock-server";
import type { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import type { ServerType } from "mcutils-js-api/dist/types/server/server";
import { Metadata } from "next";
import Image from "next/image";

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

  const { server, error } = await mcUtilsApi.fetchServer(
    decodeURIComponent(hostname),
    edition,
  );

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

  return {
    title: `${server?.hostname} - ${capitalize(edition!)}`,
    icons: {
      ...(favicon ? { icon: favicon } : {}),
    },
    openGraph: {
      ...(favicon ? { images: [{ url: favicon }] } : {}),
    },
  };
}

export default async function ServerPage({ params }: Props) {
  const { query } = await params;
  const { server, error, edition } = await getServer(query);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {(error || !server) && (
        <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10 p-0 overflow-hidden">
          <CardHeader variant="destructive">Error</CardHeader>
          <p className="px-4 py-3 text-sm text-muted-foreground">
            {error?.message ?? "Invalid lookup parameters"}
          </p>
        </Card>
      )}

      {server && (
        <div className="flex flex-col w-full max-w-3xl gap-24 mt-24">
          {/* Header */}
          <section className="flex min-w-0 flex-1 flex-col gap-4 items-center">
            <div className="flex items-center gap-4">
              {edition === "java" && (server as JavaServer).favicon?.base64 && (
                <Image
                  src={(server as JavaServer).favicon!.base64!}
                  alt={`${server.hostname} favicon`}
                  width={64}
                  height={64}
                  unoptimized
                />
              )}

              <h1 className="min-w-0 wrap-break-word text-4xl font-bold tracking-tight text-foreground text-center">
                {server.hostname}
              </h1>
            </div>
          </section>
          <div className="flex flex-col gap-4">
            {/* MOTD preview (Java only) */}
            {edition === "java" && (server as JavaServer).motd?.preview && (
              <section className="flex flex-col gap-4">
                <Card className="items-center overflow-hidden p-0 h-fit">
                  <Image
                    src={(server as JavaServer).motd!.preview!}
                    alt={`${server.hostname} MOTD preview`}
                    width={768}
                    height={128}
                    unoptimized
                    className="object-contain p-4"
                  />
                </Card>
              </section>
            )}

            {/* Details */}
            <section className="flex flex-col gap-4">
              <Card className="flex w-full min-w-0 flex-col overflow-hidden p-0">
                <CardHeader>Details</CardHeader>
                <div className="p-4">
                  <ServerDetails server={server} edition={edition} />
                </div>
              </Card>
            </section>

            {/* DNS records (collapsible) */}
            {server.records && server.records.length > 0 && (
              <section className="flex flex-col gap-4">
                <Card className="flex w-full min-w-0 flex-col overflow-hidden p-0">
                  <CardHeader>DNS Records</CardHeader>
                  <div className="p-4">
                    <ServerDnsRecords records={server.records} />
                  </div>
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
      <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10 p-0 overflow-hidden">
        <CardHeader variant="destructive">Error</CardHeader>
        <p className="px-4 py-3 text-sm text-muted-foreground">
          {error?.message ?? "Invalid address"}
        </p>
      </Card>
    </div>
  );
}
