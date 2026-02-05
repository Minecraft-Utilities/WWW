import { mcUtilsApi } from "@/app/common/mc-utils";
import ServerDetails from "@/components/server/server-details";
import ServerDnsRecords from "@/components/server/server-dns-records";
import Card from "@/components/ui/card";
import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";
import type { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import type { ServerType } from "mcutils-js-api/dist/types/server/server";
import Image from "next/image";

type Props = {
  params: Promise<{
    query?: string[];
  }>;
};

const EDITIONS: ServerType[] = ["java", "bedrock"];

function isServerType(s: string): s is ServerType {
  return EDITIONS.includes(s as ServerType);
}

export default async function ServerPage({ params }: Props) {
  const { query } = await params;

  const edition = query?.[0];
  const hostname = query?.[1];

  const invalidParams =
    !query ||
    query.length < 2 ||
    !edition ||
    !hostname ||
    !isServerType(edition);

  if (invalidParams) {
    return <InvalidServer />;
  }

  const { server, error } = await mcUtilsApi.fetchServer(
    decodeURIComponent(hostname),
    edition,
  );

  if (error || !server) {
    return <InvalidServer error={error} />;
  }

  const javaServer = server as JavaServer;

  return (
    <div className="flex flex-col md:flex-row gap-2 justify-center">
      {/* Server info (top) */}
      <Card className="flex min-w-0 flex-1 flex-col gap-5 md:max-w-[50%]">
        <ServerDetails server={server} edition={edition} />

        {/* DNS records (collapsible) */}
        {server.records && server.records.length > 0 && (
          <ServerDnsRecords records={server.records} />
        )}
      </Card>

      {/* MOTD preview (below info, Java only) */}
      {edition === "java" && javaServer.motd?.preview && (
        <Card className="items-center overflow-hidden p-0 h-fit">
          <Image
            src={javaServer.motd.preview}
            alt={`${server.hostname} MOTD preview`}
            width={768}
            height={128}
            unoptimized
            className="object-contain p-4"
          />
        </Card>
      )}
    </div>
  );
}

function InvalidServer({ error }: { error?: ErrorResponse }) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Card className="w-full max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-destructive">
          Error
        </p>
        <p className="mt-1.5 font-medium text-foreground">
          {error?.message ?? "Invalid address"}
        </p>
      </Card>
    </div>
  );
}
