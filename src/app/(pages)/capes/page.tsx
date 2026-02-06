import { mcUtilsApi } from "@/common/mc-utils";
import Card, { CardContent, CardHeader } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Capes",
  description: "A list of all known capes in Minecraft",
};

export default async function CapsPage() {
  const response = await mcUtilsApi.fetchCapes();
  const capes = response.capes;
  if (!capes) {
    return <div>No capes found</div>;
  }

  return (
    <div className="mt-24 flex w-full flex-col items-center justify-center gap-24">
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <h1 className="text-foreground text-center text-4xl font-bold tracking-tight">Capes</h1>
        <p className="text-muted-foreground text-center text-sm">A list of all known capes in Minecraft</p>
      </header>

      <div className="flex max-w-6xl flex-wrap justify-center gap-2">
        {capes.map(cape => (
          <Card key={cape.textureId} className="w-48 shrink-0">
            <CardHeader>{cape.name}</CardHeader>
            <CardContent className="flex items-center justify-center">
              <Image src={cape.parts.FRONT} alt={cape.name} width={96} height={96} unoptimized />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
