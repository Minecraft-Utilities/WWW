import LandingExamples from "@/components/landing/landing-examples";
import LandingQuerySearch from "@/components/landing/landing-query-search";

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
        <LandingExamples />
      </div>
    </div>
  );
}
