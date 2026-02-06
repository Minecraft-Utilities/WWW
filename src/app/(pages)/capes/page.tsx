import { mcUtilsApi } from "@/common/mc-utils";
import Background from "@/components/background";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";

export const dynamic = "force-dynamic";

const getCapes = cache(() => mcUtilsApi.fetchCapes());

export const metadata: Metadata = {
  title: "Capes",
  description: "A list of all known capes in Minecraft",
};

export default async function CapsPage() {
  const response = await getCapes();
  const capes = response.capes ?? [];
  const isEmpty = capes.length === 0;

  return (
    <>
      <Background url="https://cdn.fascinated.cc/PtiTRsq6.jpg" />
      <div className="mt-24 flex w-full flex-col items-center justify-center gap-24">
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
              <Card key={cape.textureId} className="w-52 shrink-0">
                <CardHeader>{cape.name}</CardHeader>
                <CardContent className="flex items-center justify-center">
                  <Image src={cape.parts.FRONT} alt={cape.name} width={96} height={96} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
