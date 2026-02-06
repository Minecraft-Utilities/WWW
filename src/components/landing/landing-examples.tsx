import Image from "next/image";
import Link from "next/link";
import Card, { CardHeader } from "../ui/card";
import SimpleLink from "../simple-link";

const playerExamples = ["ImFascinated", "Notch", "jeb_", "Technoblade"];
const serverExamples: { name: string; ip: string }[] = [
  {
    name: "WildNetwork",
    ip: "wildnetwork.net",
  },
  {
    name: "Hypixel",
    ip: "mc.hypixel.net",
  },
  {
    name: "CubeCraft",
    ip: "play.cubecraft.net",
  },
  {
    name: "Mineplex",
    ip: "mineplex.com",
  },
];

export default async function LandingExamples() {
  return (
    <div className="flex flex-col w-full gap-4 mt-20">
      {/* Player Examples */}
      <Card className="flex flex-col border-border/80 p-0 overflow-hidden w-full">
        <CardHeader>Player Examples</CardHeader>
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
          {playerExamples.map((player) => (
            <LandingExample
              key={player}
              icon={
                <LandingExampleImage
                  url={`https://mc.fascinated.cc/api/skins/${player}/face.png`}
                  size={44}
                />
              }
              name={player}
              href={`/player/${player}`}
            />
          ))}
        </div>
      </Card>

      {/* Server Examples */}
      <Card className="flex flex-col border-border/80 p-0 overflow-hidden w-full">
        <CardHeader>Server Examples</CardHeader>
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
          {serverExamples
            .filter((server) => server !== null)
            .map((server) => (
              <LandingExample
                key={server.ip}
                icon={
                  <LandingExampleImage
                    url={`https://mc.fascinated.cc/api/servers/${server.ip}/icon.png`}
                    size={44}
                  />
                }
                name={server.name}
                href={`/server/java/${server.ip}`}
              />
            ))}
        </div>
      </Card>
    </div>
  );
}

function LandingExample({
  name,
  icon,
  href,
}: {
  name: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <SimpleLink
      href={href}
      className="block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      <Card className="flex h-full flex-col items-center justify-center gap-3 border-border/80 p-4 transition-colors hover:border-primary/30 hover:bg-accent/50">
        <div className="flex shrink-0 items-center justify-center">{icon}</div>
        <p className="min-w-0 truncate text-center text-sm font-medium text-foreground">
          {name}
        </p>
      </Card>
    </SimpleLink>
  );
}

function LandingExampleImage({
  url,
  size = 40,
}: {
  url: string;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 overflow-hidden rounded-xl bg-muted/50 ring-1 ring-border/50"
      style={{ width: size, height: size }}
    >
      <Image
        alt=""
        src={url}
        width={size}
        height={size}
        className="object-cover"
        unoptimized
      />
    </span>
  );
}
