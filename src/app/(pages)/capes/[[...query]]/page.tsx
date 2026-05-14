import { mcUtilsApi } from "@/common/mc-utils";
import { formatNumberWithCommas } from "@/common/utils";
import SimpleLink from "@/components/simple-link";
import SimpleTooltip from "@/components/simple-tooltip";
import Card, { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Capes",
  description: "A list of all known capes in Minecraft",
};

const CAPE_ASPECT_RATIO = 480 / 768;

export default async function CapesPage({ params }: PageProps<"/capes/[[...query]]">) {
  const { query } = await params;
  const page = Number(query?.[0] ?? "1");

  const capesResponse = await mcUtilsApi.fetchCapes(page);
  const capes = capesResponse.capes;
  const isEmpty = !capes || capes.items.length === 0;

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
        <div className="flex max-w-5xl flex-wrap items-center justify-center gap-6">
          {capes.totalPages > 1 && (
            <Pagination
              page={page}
              totalItems={capes.totalItems ?? 0}
              itemsPerPage={capes.itemsPerPage ?? 0}
              basePath="/capes"
            />
          )}

          <div className="flex flex-wrap justify-center gap-2">
            {capes.items.map(cape => (
              <Card key={cape.id} className="w-44 shrink-0 md:w-50">
                <CardHeader className="shrink-0">{cape.name ?? "Unknown Cape"}</CardHeader>
                <CardContent className="flex min-h-0 flex-1 items-center justify-center p-4">
                  <SimpleLink
                    href={`/cape/${cape.id}`}
                    className="block transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <SimpleTooltip display="Click to view the cape">
                      <Image
                        src={cape.parts.FRONT}
                        className="object-fit mx-auto h-30"
                        alt={`Cape ${cape.id}`}
                        width={120 * CAPE_ASPECT_RATIO}
                        height={96}
                        sizes="(max-width: 640px) 50vw, 120px"
                        priority
                      />
                    </SimpleTooltip>
                  </SimpleLink>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <UserIcon className="size-4" />
                  <SimpleTooltip display="The amount of accounts that have this cape">
                    <span className="text-muted-foreground text-sm">
                      {formatNumberWithCommas(cape.uniqueOwners)}
                    </span>
                  </SimpleTooltip>
                </CardFooter>
              </Card>
            ))}
          </div>

          {capes.totalPages > 1 && (
            <Pagination
              page={page}
              totalItems={capes.totalItems ?? 0}
              itemsPerPage={capes.itemsPerPage ?? 0}
              basePath="/capes"
            />
          )}
        </div>
      )}
    </div>
  );
}
