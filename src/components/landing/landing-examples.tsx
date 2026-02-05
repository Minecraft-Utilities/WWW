import Link from "next/link";
import Card from "../ui/card";
import Image from "next/image";

export default function LandingExamples() {
  return (
    <>
      {/* Player Examples */}
      <Card className="flex flex-col gap-4 border-border/80">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Player Examples
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <LandingExample
            icon={
              <LandingExampleImage
                url="https://mc.fascinated.cc/api/skin/ImFascinated/FACE.png"
                size={44}
              />
            }
            name="ImFascinated"
            href="/player/ImFascinated"
          />
          <LandingExample
            icon={
              <LandingExampleImage
                url="https://mc.fascinated.cc/api/skin/Notch/FACE.png"
                size={44}
              />
            }
            name="Notch"
            href="/player/Notch"
          />
          <LandingExample
            icon={
              <LandingExampleImage
                url="https://mc.fascinated.cc/api/skin/jeb_/FACE.png"
                size={44}
              />
            }
            name="jeb_"
            href="/player/jeb_"
          />
          <LandingExample
            icon={
              <LandingExampleImage
                url="https://mc.fascinated.cc/api/skin/Technoblade/FACE.png"
                size={44}
              />
            }
            name="Technoblade"
            href="/player/Technoblade"
          />
        </div>
      </Card>

      {/* Server Examples */}
      <Card className="flex flex-col gap-4 border-border/80">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Server Examples
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <LandingExample
            icon={
              <LandingExampleImage
                url="https://mc.fascinated.cc/api/server/wildnetwork.net/icon.png"
                size={44}
              />
            }
            name="WildNetwork"
            href="/server/java/wildnetwork.net"
          />
          <LandingExample
            icon={
              <LandingExampleImage
                url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png"
                size={44}
              />
            }
            name="Hypixel"
            href="/server/java/mc.hypixel.net"
          />
          <LandingExample
            icon={
              <LandingExampleImage
                url="https://mc.fascinated.cc/api/server/play.cubecraft.net/icon.png"
                size={44}
              />
            }
            name="CubeCraft"
            href="/server/java/play.cubecraft.net"
          />
          <LandingExample
            icon={
              <LandingExampleImage
                url="https://mc.fascinated.cc/api/server/mineplex.com/icon.png"
                size={44}
              />
            }
            name="Mineplex"
            href="/server/java/mineplex.com"
          />
        </div>
      </Card>
    </>
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
    <Link
      href={href}
      className="block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      <Card className="flex h-full flex-col items-center justify-center gap-3 border-border/80 p-4 transition-colors hover:border-primary/30 hover:bg-accent/50">
        <div className="flex shrink-0 items-center justify-center">{icon}</div>
        <p className="min-w-0 truncate text-center text-sm font-medium text-foreground">
          {name}
        </p>
      </Card>
    </Link>
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
