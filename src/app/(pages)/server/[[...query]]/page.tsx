import { mcUtilsApi } from "@/app/common/mc-utils";
import { capitalize, formatNumberWithCommas } from "@/app/common/utils";
import { ServerDetails } from "@/components/server/server-details";
import ServerDnsRecords from "@/components/server/server-dns-records";
import Card from "@/components/ui/card";
import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";
import type { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import type { ServerType } from "mcutils-js-api/dist/types/server/server";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{
    query?: string[];
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { query } = await props.params;
  const edition = query?.[0] as ServerType;
  const hostname = query?.[1];

  return {
    title: `${hostname} - ${capitalize(edition)}`,
  };
}

export default async function ServerPage({ params }: Props) {
  const { query } = await params;

  const edition = query?.[0] as ServerType;
  const hostname = query?.[1];

  const invalidParams =
    !query ||
    query.length < 2 ||
    !edition ||
    !hostname ||
    !["java", "bedrock"].includes(edition);

  if (invalidParams) {
    return <InvalidServer />;
  }

  const { server, error } = await mcUtilsApi.fetchServer(
    decodeURIComponent(hostname),
    edition,
  );

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {error && (
        <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10">
          <p className="font-medium text-destructive">Error</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
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
              <Card className="flex w-full min-w-0 flex-col gap-4">
                <ServerDetails server={server} edition={edition} />
              </Card>
            </section>

            {/* DNS records (collapsible) */}
            {server.records && server.records.length > 0 && (
              <section className="flex flex-col gap-4">
                <Card className="flex w-full min-w-0 flex-col gap-4">
                  <ServerDnsRecords records={server.records} />
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
      <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10">
        <p className="font-medium text-destructive">Error</p>
        <p className="text-sm text-muted-foreground">
          {error?.message ?? "Invalid address"}
        </p>
      </Card>
    </div>
  );
}
