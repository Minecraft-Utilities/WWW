import { mcUtilsApi } from "@/app/common/mc-utils";
import LandingExamples from "@/components/landing/landing-examples";
import LandingQuerySearch from "@/components/landing/landing-query-search";
import Card from "@/components/ui/card";
import Image from "next/image";

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
