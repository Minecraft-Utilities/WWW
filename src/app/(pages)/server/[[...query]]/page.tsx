import { mcUtilsApi } from "@/app/common/mc-utils";
import CopyTextButton from "@/components/copy-text-button";
import Card from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { BedrockServer } from "mcutils-js-api/dist/types/server/impl/bedrock-server";
import type { JavaServer } from "mcutils-js-api/dist/types/server/impl/java-server";
import type { ServerType } from "mcutils-js-api/dist/types/server/server";

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
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          ← Look up another player or server
        </Link>
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
                Address
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 font-mono text-sm">
                <span className="break-all text-foreground">
                  {server.ip}:{server.port}
                </span>
                <CopyTextButton
                  text={`${server.ip}:${server.port}`}
                  tooltip="Copy server address"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Players
              </p>
              <p className="text-sm text-foreground">
                {server.players.online} / {server.players.max} online
              </p>
            </div>

            {edition === "java" && (
              <>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Version
                  </p>
                  <p className="text-sm text-foreground">
                    {javaServer.version?.name ?? "—"}
                  </p>
                </div>
                {javaServer.isModded && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-foreground">
                    Modded server
                    {(javaServer.forgeData?.mods?.length ?? 0) > 0 && (
                      <span className="text-muted-foreground">
                        {" "}
                        ({javaServer.forgeData?.mods?.length} mods)
                      </span>
                    )}
                  </div>
                )}
              </>
            )}

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

            <Link
              href="/"
              className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              ← Look up another player or server
            </Link>
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
