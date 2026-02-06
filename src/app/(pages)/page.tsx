import LandingExamples from "@/components/landing/landing-examples";
import LandingQuerySearch from "@/components/landing/landing-query-search";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center gap-24 mt-24 max-w-2xl mx-auto">
      <header className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Minecraft Player & Server Lookup
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Look up players by username or find server info by IP or domain.
        </p>
      </header>

      <div className="flex flex-col w-full gap-4">
        <LandingQuerySearch />
        <LandingExamples />
      </div>
    </div>
  );
}
