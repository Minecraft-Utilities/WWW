import { BedrockServer } from "mcutils-js-api/dist/types/server/impl/bedrock-server";
import { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import { Server, ServerPlatform } from "mcutils-js-api/dist/types/server/server";
import DetailRow from "../detail-row";
import TimeAgo from "../time-ago";
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
      <Card className="w-full min-w-0 overflow-hidden p-0">
        <CardHeader>Details</CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <DetailRow
              label="Cached"
              value={server.cached ? <TimeAgo date={new Date(server.cachedTime)} /> : "No"}
            />
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
                <DetailRow
                  label="Prevents chat reports"
                  value={javaServer.preventsChatReports ? "Yes" : "No"}
                  variant={javaServer.preventsChatReports ? "success" : "default"}
                />
                <DetailRow
                  label="Enforces secure chat"
                  value={javaServer.enforcesSecureChat ? "Yes" : "No"}
                  variant={javaServer.enforcesSecureChat ? "success" : "default"}
                />
                <DetailRow
                  label="Previews chat"
                  value={javaServer.previewsChat ? "Yes" : "No"}
                  variant={javaServer.previewsChat ? "warning" : "default"}
                  tooltip="When enabled, the server receives chat messages as they are typed and sends back a styled preview. This allows custom formatting like emojis or chat colors, but messages are transmitted to the server before being sent."
                />
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
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
