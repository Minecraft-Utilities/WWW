import { mcUtilsApi } from "@/app/common/mc-utils";
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
    <div className="flex justify-center px-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {capes.map((cape) => (
          <div key={cape.textureId}>
            <Card className="rounded-b-none border-b-0 bg-secondary/70 py-2 items-center">
              <p className="text-sm text-muted-foreground">{cape.name}</p>
            </Card>
            <Card className="rounded-t-none bg-secondary/90 text-sm items-center">
              <Image
                src={cape.parts.FRONT}
                alt={cape.name}
                width={96}
                height={96}
                unoptimized
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
