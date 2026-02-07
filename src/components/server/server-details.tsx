import { env } from "@/common/env";
import { timeAgo } from "@/common/time-utils";
import { BedrockServer } from "mcutils-js-api/dist/types/server/impl/bedrock-server";
import { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import { Server, ServerPlatform } from "mcutils-js-api/dist/types/server/server";
import DetailRow from "../detail-row";
import SimpleLink from "../simple-link";
import { Button } from "../ui/button";
import Card, { CardContent, CardHeader } from "../ui/card";

export interface ServerDetailsProps {
  server: Server;
  edition: ServerPlatform;
}

export function ServerDetails({ server, edition }: ServerDetailsProps) {
  const javaServer = server as JavaServer;
  const bedrockServer = server as BedrockServer;

  return (
    <section className="flex flex-col gap-4">
      <Card className="flex w-full min-w-0 flex-col overflow-hidden p-0">
        <CardHeader>Details</CardHeader>
        <CardContent>
          <div className="flex flex-col gap-0">
            <DetailRow label="Cached" value={server.cached ? timeAgo(new Date(server.cachedTime)) : "No"} />
            <DetailRow label="Hostname" value={server.hostname} />
            <DetailRow label="IP address" value={server.ip} />
            <DetailRow label="Port" value={String(server.port)} />
            {edition === "java" && (
              <>
                {javaServer.version && (
                  <DetailRow
                    label="Protocol version"
                    value={`${javaServer.version.protocolName ?? javaServer.version.name} (${javaServer.version.protocol})`}
                  />
                )}
                <DetailRow
                  label="Blocked by Mojang"
                  value={javaServer.mojangBlocked ? "Yes" : "No"}
                  variant={javaServer.mojangBlocked ? "warning" : "success"}
                />
                {javaServer.isModded && (
                  <DetailRow
                    label="Modded server"
                    value={`${javaServer.forgeData?.mods?.length ?? 0} mods`}
                    variant="warning"
                  />
                )}
              </>
            )}
            {edition === "bedrock" && (
              <>
                {bedrockServer.version?.name && (
                  <DetailRow label="Version" value={bedrockServer.version.name} />
                )}
                {bedrockServer.gamemode?.name && (
                  <DetailRow label="Gamemode" value={bedrockServer.gamemode.name} />
                )}
              </>
            )}
            <DetailRow
              label="SRV record"
              value={server.records?.some(r => r.type === "SRV") ? "Yes" : "No"}
              variant="success"
            />
            {server.location?.country && (
              <DetailRow label="Location" variant="warning" value={server.location.country} />
            )}

            {/* Open API Link */}
            <SimpleLink href={`${env.NEXT_PUBLIC_API_URL}/servers/${edition}/${server.hostname}`}>
              <Button variant="outline" size="sm">
                View API
              </Button>
            </SimpleLink>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
