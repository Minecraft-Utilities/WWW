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
    <>
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
          value={server.records?.some((r) => r.type === "SRV") ? "Yes" : "No"}
          variant="success"
        />
      </div>
    </>
  );
}
