import LandingPlayerExamples from "@/components/landing/landing-player-examples";
import LandingQuerySearch from "@/components/landing/landing-query-search";
import LandingServerExamples from "@/components/landing/landing-server-examples";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="mx-auto mt-24 flex w-full max-w-3xl flex-col items-center gap-24">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-3xl">
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
  );
}
