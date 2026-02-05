import { mcUtilsApi } from "@/app/common/mc-utils";
import CopyTextButton from "@/components/copy-text-button";
import Card from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { BedrockServer } from "mcutils-js-api/dist/types/server/impl/bedrock-server";
import type { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import type { ServerType } from "mcutils-js-api/dist/types/server/server";
import type { DnsRecord } from "mcutils-js-api/dist/types/dns/dns-record";
import type { SRVRecord } from "mcutils-js-api/dist/types/dns/impl/srv-record";
import { formatNumberWithCommas } from "@/app/common/utils";
import DetailRow from "@/components/detail-row";

function isSrvRecord(r: DnsRecord): r is SRVRecord {
  return r.type === "SRV";
}

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
    return (
      <div className="flex w-full flex-col items-center gap-6 px-2 py-4">
        <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10">
          <p className="font-medium text-destructive">Invalid address</p>
          <p className="text-sm text-muted-foreground">
            Use a server edition (Java or Bedrock) and hostname, for example:{" "}
            <code className="rounded bg-muted px-1">
              /server/java/mc.hypixel.net
            </code>
          </p>
        </Card>
      </div>
    );
  }

  const { server, error } = await mcUtilsApi.fetchServer(
    decodeURIComponent(hostname),
    edition,
  );
  const javaServer = server as JavaServer;
  const bedrockServer = server as BedrockServer;

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {error && (
        <Card className="w-full max-w-xl border-destructive/50 bg-destructive/10">
          <p className="font-medium text-destructive">Error</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </Card>
      )}

      {server && (
        <div className="flex w-full max-w-3xl flex-col gap-6">
          {/* Server info (top) */}
          <Card className="flex min-w-0 flex-1 flex-col gap-6 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              {edition === "java" && (
                <Image
                  src={javaServer.favicon?.base64!}
                  alt={`${server.hostname} favicon`}
                  width={64}
                  height={64}
                  unoptimized
                  className="object-contain"
                />
              )}

              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {server.hostname}
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Players
              </p>
              <p className="text-sm text-foreground">
                {formatNumberWithCommas(server.players.online)} /{" "}
                {formatNumberWithCommas(server.players.max)} online
              </p>
            </div>

            {edition === "bedrock" && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Version · Gamemode
                </p>
                <p className="text-sm text-foreground">
                  {bedrockServer.version?.name ?? "—"}
                  {" · "}
                  {bedrockServer.gamemode?.name ?? "—"}
                </p>
              </div>
            )}

            {/* Server details (key-value) */}
            <div className="flex flex-col gap-0 border-t border-border pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Details
              </p>
              <DetailRow label="Hostname" value={server.hostname} />
              <DetailRow label="IP address" value={server.ip} />
              <DetailRow label="Port" value={String(server.port)} />
              {edition === "java" && javaServer.version && (
                <DetailRow
                  label="Protocol version"
                  value={`${javaServer.version.protocolName ?? javaServer.version.name} (${javaServer.version.protocol})`}
                />
              )}
              {server.location?.country && (
                <DetailRow
                  label="Location"
                  variant="warning"
                  value={server.location.country}
                />
              )}
              {edition === "java" && (
                <DetailRow
                  label="Blocked by Mojang"
                  value={javaServer.mojangBlocked ? "Yes" : "No"}
                  variant={javaServer.mojangBlocked ? "warning" : "success"}
                />
              )}
              {edition === "java" && javaServer.isModded && (
                <DetailRow
                  label="Modded server"
                  value={`${javaServer.forgeData?.mods?.length ?? 0} mods`}
                  variant="warning"
                />
              )}
              <DetailRow
                label="SRV record"
                value={
                  server.records?.some((r) => r.type === "SRV") ? "Yes" : "No"
                }
                variant="success"
              />
            </div>

            {/* DNS records (collapsible) */}
            {server.records && server.records.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                  <table className="w-full min-w-[320px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-3 py-2 font-medium text-muted-foreground">
                          Hostname
                        </th>
                        <th className="px-3 py-2 font-medium text-muted-foreground">
                          Type
                        </th>
                        <th className="px-3 py-2 font-medium text-muted-foreground">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {server.records.map((record, i) => (
                        <tr
                          key={i}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="break-all px-3 py-2 font-mono text-foreground">
                            {isSrvRecord(record)
                              ? record.name
                              : (record.name ?? "—")}
                          </td>
                          <td className="px-3 py-2 font-mono text-foreground">
                            {record.type}
                          </td>
                          <td className="break-all px-3 py-2 font-mono text-muted-foreground">
                            {isSrvRecord(record)
                              ? `${record.priority} ${record.weight} ${record.port} ${record.target}`
                              : (record.address ?? "—")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>

          {/* MOTD preview (below info, Java only) */}
          {edition === "java" && javaServer.motd?.preview && (
            <Card className="items-center overflow-hidden p-0">
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
      )}
    </div>
  );
}
