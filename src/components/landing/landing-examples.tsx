import { getRandomEntries } from "@/common/utils";
import Image from "next/image";
import SimpleLink from "../simple-link";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardFooter, CardHeader } from "../ui/card";

const playerExamples: string[] = [
  "ImFascinated",
  "Notch",
  "jeb_",
  "Technoblade",
  "NoneTaken",
  "Dinnerbone",
  "Fit",
  "Steve",
  "DanTDM",
];
const serverExamples: { name: string; ip: string }[] = [
  {
    name: "WildNetwork",
    ip: "wildnetwork.net",
  },
  {
    name: "Hypixel",
    ip: "hypixel.net",
  },
  {
    name: "CubeCraft",
    ip: "cubecraft.net",
  },
  {
    name: "Mineplex",
    ip: "mineplex.com",
  },
  {
    name: "Aetheria",
    ip: "aetheria.cc",
  },
  {
    name: "Wynncraft",
    ip: "wynncraft.com",
  },
  {
    name: "2B2T",
    ip: "2b2t.org",
  },
  {
    name: "Hoplite",
    ip: "hoplite.gg",
  },
  {
    name: "Minemen Club",
    ip: "minemen.club",
  },
  {
    name: "OG-Network",
    ip: "og-network.net",
  },
];

export default async function LandingExamples() {
  const players = getRandomEntries(playerExamples, 7);
  const servers = getRandomEntries(serverExamples, 7);

  return (
    <div className="mt-20 flex w-full flex-col gap-4">
      {/* Player Examples */}
      <Card className="border-border/80 flex w-full flex-col overflow-hidden p-0">
        <CardHeader>Player Examples</CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-3">
          {players.map(player => (
            <LandingExample
              key={player}
              url={`https://mc.fascinated.cc/api/skins/${player}/face.png`}
              tooltip={
                <span>
                  Click to view information for <b>{player}</b>
                </span>
              }
              name={player}
              href={`/player/${player}`}
            />
          ))}
        </CardContent>
      </Card>

      {/* Server Examples */}
      <Card className="border-border/80 flex w-full flex-col overflow-hidden p-0">
        <CardHeader>Server Examples</CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-3">
          {servers.map(server => (
            <LandingExample
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
    </div>
  );
}

function LandingExample({
  href,
  url,
  tooltip,
  name,
}: {
  url: string;
  href: string;
  tooltip: React.ReactNode;
  name: string;
}) {
  return (
    <SimpleTooltip display={tooltip}>
      <SimpleLink
        href={href}
        className="block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <Card className="flex size-34 flex-col p-0">
          <CardContent className="flex flex-1 items-center justify-center p-0">
            <Image alt="" src={url} width={64} height={64} className="rounded-lg object-cover" unoptimized />
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-center text-sm">{name}</p>
          </CardFooter>
        </Card>
      </SimpleLink>
    </SimpleTooltip>
  );
}
