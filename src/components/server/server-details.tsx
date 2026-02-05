import { Server, ServerType } from "mcutils-js-api/dist/types/server/server";
import Image from "next/image";
import DetailRow from "../detail-row";
import { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import { BedrockServer } from "mcutils-js-api/dist/types/server/impl/bedrock-server";
import { formatNumberWithCommas } from "@/app/common/utils";

export default function ServerDetails({
  server,
  edition,
}: {
  server: Server;
  edition: ServerType;
}) {
  const javaServer = server as JavaServer;
  const bedrockServer = server as BedrockServer;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 xs:flex-row xs:items-center xs:gap-4">
        {edition === "java" && (
          <Image
            src={javaServer.favicon?.base64!}
            alt={`${server.hostname} favicon`}
            width={64}
            height={64}
            unoptimized
            className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
          />
        )}

        <h1 className="min-w-0 wrap-break-word text-xl font-semibold tracking-tight text-foreground xs:text-2xl sm:text-3xl">
          {server.hostname}
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Players
        </p>
        <p className="text-sm text-foreground">
          {formatNumberWithCommas(server.players.online)} /{" "}
          {formatNumberWithCommas(server.players.max)} online
        </p>
      </div>

      {/* Server details (key-value) */}
      <div className="flex flex-col gap-0 border-t border-border pt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Details
        </p>
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
          value={server.records?.some((r) => r.type === "SRV") ? "Yes" : "No"}
          variant="success"
        />
        {server.location?.country && (
          <DetailRow
            label="Location"
            variant="warning"
            value={server.location.country}
          />
        )}
      </div>
    </div>
  );
}
