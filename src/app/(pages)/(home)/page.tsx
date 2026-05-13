import { env } from "@/common/env";
import LandingPlayerExamples from "@/components/landing/landing-player-examples";
import LandingQuerySearch from "@/components/landing/landing-query-search";
import LandingServerExamples from "@/components/landing/landing-server-examples";
import Statistics from "@/components/landing/statistics";
import type { Metadata } from "next";
import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MC Utils — Minecraft Player & Server Lookup",
  description:
    "Look up any Minecraft player by username or UUID — view their skin, cape, and profile history. Check Java and Bedrock server status, player counts, MOTD, and more.",
  openGraph: {
    url: env.NEXT_PUBLIC_BASE_URL,
    title: "MC Utils — Minecraft Player & Server Lookup",
    description:
      "Look up any Minecraft player by username or UUID — view their skin, cape, and profile history. Check Java and Bedrock server status, player counts, MOTD, and more.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MC Utils",
  url: env.NEXT_PUBLIC_BASE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  description:
    "Look up any Minecraft player by username or UUID — view their skin, cape, and profile history. Check Java and Bedrock server status, player counts, MOTD, and more.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HomePage() {
  return (
    <>
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col items-center gap-16">
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

          <Statistics />
        </div>

        <section className="text-muted-foreground max-w-2xl text-center text-sm leading-relaxed">
          <p>
            MC Utils is a free Minecraft lookup tool. Search any player to view their current skin, cape, UUID, and
            name history. Paste a Java or Bedrock server address to instantly check whether it&apos;s online, see its
            MOTD, and monitor live player counts — no login required.
          </p>
        </section>
      </div>
    </>
  );
}
