import { mcUtilsApi } from "@/common/mc-utils";
import { formatNumberWithCommas } from "@/common/utils";
import SimpleLink from "@/components/simple-link";
import SimpleTooltip from "@/components/simple-tooltip";
import { Button } from "@/components/ui/button";
import Card, { CardContent, CardFooter } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import { UserIcon } from "lucide-react";
import { SkinLookupSort } from "mcutils-js-api/dist/types/player/skin/skin-lookup-sort";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skins",
  description: "The list of all seen skins for players",
};

const SORT_OPTIONS: Record<SkinLookupSort, string> = {
  trending: "Trending",
  top: "Top",
  latest: "Latest",
};

const SKIN_ASPECT_RATIO = 452 / 768;

export default async function SkinsPage({ params }: PageProps<"/skins/[[...query]]">) {
  const { query } = await params;

  const rawFirst = query?.[0];
  const isSort = rawFirst !== undefined && Object.keys(SORT_OPTIONS).includes(rawFirst);
  const sort = (isSort ? rawFirst : "trending") as SkinLookupSort;
  const page = Number(isSort ? (query!.length >= 2 ? query![1] : "1") : (rawFirst ?? "1"));

  const skinsResponse = await mcUtilsApi.fetchSkins(page, sort);
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
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.entries(SORT_OPTIONS).map(([key, label]) => (
              <Button
                key={key}
                asChild
                size="sm"
                variant={sort === key ? "default" : "secondary"}
                className="min-w-24"
                aria-current={sort === key ? "page" : undefined}
              >
                <Link href={`/skins/${key}`}>{label}</Link>
              </Button>
            ))}
          </div>

          <Pagination
            page={page}
            totalItems={skins.totalItems ?? 0}
            itemsPerPage={skins.itemsPerPage ?? 0}
            basePath={`/skins/${sort}`}
          />
          <div className="flex flex-wrap justify-center gap-2">
            {skins.items.map(skin => (
              <Card key={skin.id} className="w-44 shrink-0 md:w-44">
                <CardContent className="flex min-h-0 flex-1 items-center justify-center p-4">
                  <SimpleLink
                    href={`/skin/${skin.id}`}
                    className="block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <SimpleTooltip display="Click to view the skin">
                      <Image
                        src={skin.parts.FULLBODY_ISO_FRONT}
                        className="object-fit mx-auto h-30"
                        alt={`Skin ${skin.id}`}
                        width={120 * SKIN_ASPECT_RATIO}
                        height={96}
                        sizes="(max-width: 640px) 50vw, 120px"
                        priority
                      />
                    </SimpleTooltip>
                  </SimpleLink>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <UserIcon className="size-4" />
                  <SimpleTooltip display="The amount of accounts that have used this skin">
                    <span className="text-muted-foreground text-sm">
                      {formatNumberWithCommas(skin.uniqueOwners)}
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
            basePath={`/skins/${sort}`}
          />
        </div>
      )}
    </div>
  );
}
