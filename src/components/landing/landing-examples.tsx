import Image from "next/image";
import SimpleLink from "../simple-link";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardHeader } from "../ui/card";

const playerExamples = ["ImFascinated", "Notch", "jeb_", "Technoblade", "NoneTaken", "Dinnerbone"];
const serverExamples = [
  "wildnetwork.net",
  "hypixel.net",
  "play.cubecraft.net",
  "mineplex.com",
  "aetheria.cc",
  "play.wynncraft.com",
];

export default async function LandingExamples() {
  return (
    <div className="mt-20 flex w-full flex-col gap-4">
      {/* Player Examples */}
      <Card className="border-border/80 flex w-full flex-col overflow-hidden p-0">
        <CardHeader>Player Examples</CardHeader>
        <div className="flex flex-wrap justify-center gap-3 p-4">
          {playerExamples.map(player => (
            <LandingExample
              key={player}
              icon={<LandingExampleImage url={`https://mc.fascinated.cc/api/skins/${player}/face.png`} />}
              tooltip={
                <span>
                  Click to view information for <b>{player}</b>
                </span>
              }
              href={`/player/${player}`}
            />
          ))}
        </div>
      </Card>

      {/* Server Examples */}
      <Card className="border-border/80 flex w-full flex-col overflow-hidden p-0">
        <CardHeader>Server Examples</CardHeader>
        <div className="flex flex-wrap justify-center gap-3 p-4">
          {serverExamples.map(server => (
            <LandingExample
              key={server}
              icon={<LandingExampleImage url={`https://mc.fascinated.cc/api/servers/${server}/icon.png`} />}
              tooltip={
                <span>
                  Click to view information for <b>{server}</b>
                </span>
              }
              href={`/server/java/${server}`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

function LandingExample({
  icon,
  href,
  tooltip,
}: {
  icon: React.ReactNode;
  href: string;
  tooltip: React.ReactNode;
}) {
  return (
    <SimpleTooltip display={tooltip}>
      <SimpleLink
        href={href}
        className="block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <Card className="border-border/80 hover:border-primary/30 hover:bg-accent/50 flex h-full flex-col items-center justify-center transition-colors">
          <div className="flex shrink-0 items-center justify-center">{icon}</div>
        </Card>
      </SimpleLink>
    </SimpleTooltip>
  );
}

function LandingExampleImage({ url }: { url: string }) {
  const size = 48;
  return (
    <span
      className="bg-muted/50 ring-border/50 flex shrink-0 overflow-hidden rounded-xl ring-1"
      style={{ width: size, height: size }}
    >
      <Image alt="" src={url} width={size} height={size} className="object-cover" unoptimized />
    </span>
  );
}
