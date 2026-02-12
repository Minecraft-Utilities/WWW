import { mcUtilsApi } from "@/common/mc-utils";
import { formatNumberWithCommas } from "@/common/utils";
import SimpleLink from "@/components/simple-link";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type SkinPageProps = {
  params: Promise<{
    query: string;
  }>;
};

export const metadata: Metadata = {
  title: "Skin",
  description: "A specific skin's details",
};

const SKIN_ASPECT_RATIO = 452 / 768;

export default async function SkinsPage({ params }: SkinPageProps) {
  const { query } = await params;
  const skinResponse = await mcUtilsApi.fetchSkin(query);
  const skin = skinResponse.skin;

  if (!skin) {
    return redirect("/skins");
  }

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-16">
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <h1 className="text-foreground flex flex-row items-center gap-5 text-center text-4xl font-bold tracking-tight">
          <SimpleLink href={`/player/${skin.firstSeenUsing}`}>{skin.firstSeenUsing}</SimpleLink>
          Minecraft Skin
        </h1>
      </header>

      <div className="flex w-full max-w-5xl flex-col gap-4 md:flex-row">
        {/* Left */}
        <div className="flex w-full min-w-0 flex-1 flex-row gap-4 md:flex-col">
          <Card className="h-fit w-full">
            <CardHeader>
              <p>Skin</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Image
                src={skin.imageUrl}
                alt={skin.id}
                width={320 * SKIN_ASPECT_RATIO}
                height={0}
                priority
                unoptimized
              />
            </CardContent>
          </Card>

          <Card className="h-fit w-full text-sm">
            <CardHeader>
              <p>Players ({formatNumberWithCommas(skin.accountsUsed)})</p>
            </CardHeader>
            <CardContent className="flex h-64 flex-wrap gap-2 overflow-y-auto">
              {skin.accountsSeenUsing.map(account => (
                <SimpleLink key={account} href={`/player/${account}`}>
                  <p>{account}</p>
                </SimpleLink>
              ))}
              {skin.accountsSeenUsing.length == 250 && (
                <p>+ {formatNumberWithCommas(skin.accountsUsed - 250)} more...</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="w-full max-w-sm min-w-0 shrink-0">
          <Card className="h-fit w-full">
            <CardHeader>
              <p>First Used By</p>
            </CardHeader>
            <CardContent>
              <SimpleLink href={`/player/${skin.firstSeenUsing}`}>
                <p>{skin.firstSeenUsing}</p>
              </SimpleLink>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
