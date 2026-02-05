import { mcUtilsApi } from "@/app/common/mc-utils";
import CopyTextButton from "@/components/copy-text-button";
import Card from "@/components/ui/card";
import Image from "next/image";

type Props = {
  params: Promise<{
    query: string;
  }>;
};

export default async function PlayerPage({ params }: Props) {
  const { query } = await params;
  const response = await mcUtilsApi.fetchPlayer(query);
  const player = response.player;
  const error = response.error;

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      {error && <div>Error: {error.message}</div>}

      {player && (
        <div className="flex flex-row items-stretch">
          <div className="flex flex-col gap-4">
            <Card>
              <Image
                src={player.skin.parts.FULLBODY_FRONT}
                alt="Player Full Body Front"
                width={256}
                height={256}
                unoptimized
              />
            </Card>

            <Card className="flex flex-col gap-4">
              <p className="text-muted-foreground">Cape</p>

              <Image
                src={player.skin.parts.FULLBODY_FRONT}
                alt="Player Full Body Front"
                width={64}
                height={64}
                unoptimized
              />
            </Card>
          </div>

          <div className="flex flex-col p-8">
            <p className="text-4xl font-semibold">{player.username}</p>
            <div className="text-lg flex gap-2 items-center">
              <span className="text-muted-foreground">UUID</span>{" "}
              {player.uniqueId}
              <CopyTextButton
                text={player.uniqueId}
                tooltip={`Copy ${player.username}'s UUID to your clipboard`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
