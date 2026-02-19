import { mcUtilsApi } from "@/common/mc-utils";
import { formatNumberWithCommas } from "@/common/utils";
import { CAPE_ASPECT_RATIO } from "@/components/player/player-capes";
import SimpleTooltip from "@/components/simple-tooltip";
import Card, { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";

export const dynamic = "force-dynamic";

const getCapes = cache(() => mcUtilsApi.fetchCapes());

export const metadata: Metadata = {
  title: "Capes",
  description: "A list of all known capes in Minecraft",
};

export default async function CapesPage() {
  const response = await getCapes();
  const capes = response.capes ?? [];
  const isEmpty = capes.length === 0;

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-16">
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <h1 className="text-foreground text-center text-4xl font-bold tracking-tight">Capes</h1>
        <p className="text-muted-foreground text-center text-sm">A list of all known capes in Minecraft</p>
      </header>

      {isEmpty ? (
        <Card className="w-full max-w-md">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No capes found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex max-w-6xl flex-wrap justify-center gap-2">
          {capes.map(cape => (
            <Card key={cape.textureId} className="w-44 shrink-0 md:w-50">
              <CardHeader className="shrink-0">{cape.name ?? "Unknown Cape"}</CardHeader>
              <CardContent className="flex min-h-0 flex-1 items-center justify-center p-4">
                <Image
                  src={cape.parts.FRONT}
                  alt={cape.name ?? "Unknown Cape"}
                  width={120 * CAPE_ASPECT_RATIO}
                  height={96}
                  className="object-fit mx-auto h-[120px]"
                />
              </CardContent>
              <CardFooter className="flex items-center gap-2">
                <UserIcon className="size-4" />
                <SimpleTooltip display="The amount of accounts that have used this cape">
                  <span className="text-muted-foreground text-sm">
                    {formatNumberWithCommas(cape.accountsOwned)}
                  </span>
                </SimpleTooltip>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
