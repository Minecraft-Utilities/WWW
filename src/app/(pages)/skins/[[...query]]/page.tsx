import { mcUtilsApi } from "@/common/mc-utils";
import { formatNumberWithCommas } from "@/common/utils";
import SimpleLink from "@/components/simple-link";
import SimpleTooltip from "@/components/simple-tooltip";
import Card, { CardContent, CardFooter } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skins",
  description: "The list of all seen skins for players",
};

const SKIN_ASPECT_RATIO = 452 / 768;

export default async function SkinsPage({ params }: PageProps<"/skins/[[...query]]">) {
  const { query } = await params;
  const page = Number(query?.[0] ?? "1");

  const skinsResponse = await mcUtilsApi.fetchSkins(page);
  const skins = skinsResponse.skins;
  const isEmpty = skins?.items.length === 0 || !skins;

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-16">
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <h1 className="text-foreground text-center text-4xl font-bold tracking-tight">Skins</h1>
        <p className="text-muted-foreground text-center text-sm">The list of all seen skins for players</p>
      </header>

      {isEmpty ? (
        <Card className="w-full max-w-md">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No skins found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex max-w-5xl flex-wrap items-center justify-center gap-6">
          <Pagination
            page={page}
            totalItems={skins.totalItems ?? 0}
            itemsPerPage={skins.itemsPerPage ?? 0}
            basePath="/skins"
          />

          <div className="flex flex-wrap justify-center gap-2">
            {skins.items.map((skin, index) => (
              <Card key={index} className="w-44 shrink-0 md:w-44">
                <CardContent className="flex min-h-0 flex-1 items-center justify-center p-4">
                  <SimpleLink
                    href={`/skin/${skin.id}`}
                    className="block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <SimpleTooltip display="Click to view the skin">
                      <Image
                        src={skin.imageUrl}
                        className="object-fit mx-auto h-[120px]"
                        alt={`Skin ${index + 1}`}
                        width={120 * SKIN_ASPECT_RATIO}
                        height={96}
                        priority
                        unoptimized
                      />
                    </SimpleTooltip>
                  </SimpleLink>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <UserIcon className="size-4" />
                  <SimpleTooltip display="The amount of accounts that have used this skin">
                    <span className="text-muted-foreground text-sm">
                      {formatNumberWithCommas(skin.accountsUsed)}
                    </span>
                  </SimpleTooltip>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination
            page={page}
            totalItems={skins.totalItems ?? 0}
            itemsPerPage={skins.itemsPerPage ?? 0}
            basePath="/skins"
          />
        </div>
      )}
    </div>
  );
}
