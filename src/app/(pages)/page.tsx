import { env } from "@/common/env";
import Background from "@/components/background";
import LandingPlayerExamples from "@/components/landing/landing-player-examples";
import LandingQuerySearch from "@/components/landing/landing-query-search";
import LandingServerExamples from "@/components/landing/landing-server-examples";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  openGraph: {
    url: env.NEXT_PUBLIC_BASE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <Background url="https://cdn.fascinated.cc/TeluON8U.jpg" />
      <div className="mx-auto mt-24 flex w-full max-w-3xl flex-col items-center gap-24">
        <header className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Minecraft Player & Server Lookup
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Look up any player by Username / UUID or inspect any server by hostname.
          </p>
        </header>

        <div className="flex w-full flex-col gap-4">
          <LandingQuerySearch />

          <div className="mt-20 flex w-full flex-col gap-4">
            <LandingPlayerExamples />
            <LandingServerExamples />
          </div>
        </div>
      </div>
    </>
  );
}
