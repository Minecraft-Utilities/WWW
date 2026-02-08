import { getRandomEntries } from "@/common/utils";
import Card, { CardContent, CardHeader } from "../ui/card";
import { LandingExampleCard } from "./landing-example-card";

const serverExamples: Record<string, string> = {
  "wildnetwork.net": "WildNetwork",
  "hypixel.net": "Hypixel",
  "cubecraft.net": "CubeCraft",
  "mineplex.com": "Mineplex",
  "aetheria.cc": "Aetheria",
  "wynncraft.com": "Wynncraft",
  "2b2t.org": "2B2T",
  "hoplite.gg": "Hoplite",
  "minemen.club": "Minemen Club",
  "og-network.net": "OG-Network",
};

export default async function LandingServerExamples() {
  const servers = getRandomEntries(
    Object.entries(serverExamples).map(([ip, name]) => ({ ip, name })),
    5
  );
  return (
    <Card className="border-border/80 w-full overflow-hidden p-0">
      <CardHeader>Server Examples</CardHeader>
      <CardContent className="flex flex-wrap justify-center gap-3">
        {servers.map(server => (
          <LandingExampleCard
            key={server.ip}
            url={`https://mc.fascinated.cc/api/servers/${server.ip}/icon.png`}
            tooltip={
              <span>
                Click to view information for <b>{server.name}</b>
              </span>
            }
            name={server.name}
            href={`/server/java/${server.ip}`}
          />
        ))}
      </CardContent>
    </Card>
  );
}
