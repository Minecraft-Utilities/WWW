import { mcUtilsApi } from "@/common/mc-utils";
import { formatNumberWithCommas } from "@/common/utils";
import Card, { CardContent, CardFooter } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

type SkinPageProps = {
  params: Promise<{
    page: string;
  }>;
};

export const metadata: Metadata = {
  title: "Skins",
  description: "The list of all seen skins for players",
};

const SKIN_ASPECT_RATIO = 452 / 768;

export default async function SkinsPage({ params }: SkinPageProps) {
  const { page } = await params;
  const pageNumber = Number(page);
  const skinsResponse = await mcUtilsApi.fetchSkins(pageNumber);
  const skins = skinsResponse.skins;
  const isEmpty = skins?.items.length === 0 || !skins;

  return (
    <div className="mt-24 flex w-full flex-col items-center justify-center gap-24">
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
          <div className="flex flex-wrap justify-center gap-2">
            {skins.items.map(skin => (
              <Card key={skin.textureId} className="w-44 shrink-0 md:w-44">
                <CardContent className="flex min-h-0 flex-1 items-center justify-center p-4">
                  <Image
                    src={skin.parts.FULLBODY_FRONT}
                    alt={skin.textureId}
                    width={120 * SKIN_ASPECT_RATIO}
                    height={96}
                    unoptimized
                    className="object-fit mx-auto h-[120px]"
                  />
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <UserIcon className="size-4" />
                  <span className="text-muted-foreground text-sm">
                    {formatNumberWithCommas(skin.accountsUsed)}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination
            page={pageNumber}
            totalItems={skins.totalItems ?? 0}
            itemsPerPage={skins.itemsPerPage ?? 0}
            basePath="/skins"
          />
        </div>
      )}
    </div>
  );
}
