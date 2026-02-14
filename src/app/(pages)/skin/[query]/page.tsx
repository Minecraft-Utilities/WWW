import { mcUtilsApi } from "@/common/mc-utils";
import SimpleLink from "@/components/simple-link";
import SkinFirstUsedBy from "@/components/skin/skin-first-used-by";
import SkinHeadCommands from "@/components/skin/skin-head-commands";
import SkinPlayers from "@/components/skin/skin-players";
import SkinPreview from "@/components/skin/skin-preview";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/skin/[query]">): Promise<Metadata> {
  const { query } = await props.params;
  const skinResponse = await mcUtilsApi.fetchSkin(query);
  const skin = skinResponse.skin;

  if (!skin) {
    return {
      title: "Skin not found",
      description: "Skin not found",
      openGraph: {
        title: "Skin not found",
        description: "Skin not found",
      },
    };
  }

  return {
    title: `Minecraft Skin`,
    description: `View the details for this skin`,
    openGraph: {
      description: `View the details for this skin`,
      images: [
        {
          url: skin.imageUrl,
        },
      ],
    },
  };
}

export default async function SkinsPage({ params }: PageProps<"/skin/[query]">) {
  const { query } = await params;

  const skinResponse = await mcUtilsApi.fetchSkin(query);
  const skin = skinResponse.skin;

  if (!skin) {
    return redirect("/skins");
  }

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-16">
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4 px-4">
        <h1 className="text-foreground flex flex-col items-center gap-1 text-center text-2xl font-bold tracking-tight sm:flex-row sm:gap-5 sm:text-4xl">
          <SimpleLink href={`/player/${skin.firstSeenUsing}`}>{skin.firstSeenUsing}</SimpleLink>
          <span className="whitespace-nowrap">Minecraft Skin</span>
        </h1>
      </header>

      <div className="flex w-full max-w-5xl flex-col gap-4 md:flex-row">
        {/* Left */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
          <SkinPreview skin={skin} />
          <SkinPlayers skin={skin} />
        </div>

        {/* Right */}
        <div className="flex w-full min-w-0 flex-col gap-4 md:max-w-sm">
          <SkinFirstUsedBy skin={skin} />
          <SkinHeadCommands skin={skin} />
        </div>
      </div>
    </div>
  );
}
