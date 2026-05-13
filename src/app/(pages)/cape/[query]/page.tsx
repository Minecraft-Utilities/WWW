import { mcUtilsApi } from "@/common/mc-utils";
import CapeDetails from "@/components/cape/cape-details";
import CapePlayers from "@/components/cape/cape-players";
import CapePreview from "@/components/cape/cape-preview";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/cape/[query]">): Promise<Metadata> {
  const { query } = await props.params;
  const capeResponse = await mcUtilsApi.fetchCape(query);
  const cape = capeResponse.cape;

  if (!cape) {
    return {
      title: "Cape not found",
      description: "Cape not found",
      openGraph: {
        title: "Cape not found",
        description: "Cape not found",
      },
    };
  }

  const capeName = cape.name ?? "Minecraft Cape";
  return {
    title: `${capeName} — Minecraft Cape`,
    description: `View the ${capeName} Minecraft cape on MC Utils — preview the design, see current wearers, and explore cape details.`,
    openGraph: {
      title: `${capeName} — Minecraft Cape`,
      description: `View the ${capeName} Minecraft cape on MC Utils — preview the design, see current wearers, and explore cape details.`,
      images: [
        {
          url: cape.parts.FRONT,
        },
      ],
    },
  };
}

export default async function CapePage({ params }: PageProps<"/cape/[query]">) {
  const { query } = await params;

  const capeResponse = await mcUtilsApi.fetchCape(query);
  const cape = capeResponse.cape;

  if (!cape) {
    return redirect("/capes");
  }

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-16">
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4 px-4">
        <h1 className="text-foreground text-center text-2xl font-bold tracking-tight sm:text-4xl">
          {cape.name ?? "Minecraft Cape"}
        </h1>
      </header>

      <div className="flex w-full max-w-5xl flex-col gap-4 md:flex-row">
        {/* Left — cape + players */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
          <CapePreview cape={cape} />
          <CapePlayers cape={cape} />
        </div>

        {/* Right — details */}
        <div className="flex w-full min-w-0 flex-col gap-4 md:max-w-sm">
          <CapeDetails cape={cape} />
        </div>
      </div>
    </div>
  );
}
