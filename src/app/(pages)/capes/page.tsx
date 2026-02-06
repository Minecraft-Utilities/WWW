import { mcUtilsApi } from "@/common/mc-utils";
import Card from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

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
    <div className="mt-24 flex w-full flex-col justify-center gap-24">
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <h1 className="text-foreground text-center text-4xl font-bold tracking-tight">Capes</h1>
        <p className="text-muted-foreground text-center text-sm">A list of all known capes in Minecraft</p>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {capes.map(cape => (
          <div key={cape.textureId}>
            <Card className="bg-secondary/70 items-center rounded-b-none border-b-0 py-2">
              <p className="text-muted-foreground text-sm">{cape.name}</p>
            </Card>
            <Card className="bg-secondary/90 items-center rounded-t-none text-sm">
              <Image src={cape.parts.FRONT} alt={cape.name} width={96} height={96} unoptimized />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
