import LandingExample from "@/components/landing/landing-example";
import LandingExampleImage from "@/components/landing/landing-example-image";
import LandingQuerySearch from "@/components/landing/landing-query-search";
import QuerySearch from "@/components/lookup/query-search";
import Card from "@/components/ui/card";
import { ServerIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-start px-4 pt-6 sm:pt-10">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Minecraft Player & Server Lookup
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Look up players by username or find server info by IP or domain.
          </p>
        </header>

        <LandingQuerySearch />

        {/* Player Examples */}
        <Card className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Player Examples
          </p>
          <div className="grid grid-cols-4 gap-2">
            <LandingExample
              icon={
                <LandingExampleImage url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png" />
              }
              name="Hypixel"
              href="/server/java/mc.hypixel.net"
            />
            <LandingExample
              icon={
                <LandingExampleImage url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png" />
              }
              name="Hypixel"
              href="/server/java/mc.hypixel.net"
            />
            <LandingExample
              icon={
                <LandingExampleImage url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png" />
              }
              name="Hypixel"
              href="/server/java/mc.hypixel.net"
            />
            <LandingExample
              icon={
                <LandingExampleImage url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png" />
              }
              name="Hypixel"
              href="/server/java/mc.hypixel.net"
            />
          </div>
        </Card>

        {/* Server Examples */}
        <Card className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Server Examples
          </p>
          <div className="grid grid-cols-4 gap-2">
            <LandingExample
              icon={
                <LandingExampleImage url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png" />
              }
              name="Hypixel"
              href="/server/java/mc.hypixel.net"
            />
            <LandingExample
              icon={
                <LandingExampleImage url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png" />
              }
              name="Hypixel"
              href="/server/java/mc.hypixel.net"
            />
            <LandingExample
              icon={
                <LandingExampleImage url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png" />
              }
              name="Hypixel"
              href="/server/java/mc.hypixel.net"
            />
            <LandingExample
              icon={
                <LandingExampleImage url="https://mc.fascinated.cc/api/server/hypixel.net/icon.png" />
              }
              name="Hypixel"
              href="/server/java/mc.hypixel.net"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
