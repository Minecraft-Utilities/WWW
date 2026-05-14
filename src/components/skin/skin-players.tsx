import { formatNumberWithCommas } from "@/common/utils";
import { Skin } from "mcutils-js-api/dist/types/player/skin/skin";
import SimpleLink from "../simple-link";
import Card, { CardContent, CardHeader } from "../ui/card";

interface SkinPlayersProps {
  skin: Skin;
}

export default function SkinPlayers({ skin }: SkinPlayersProps) {
  return (
    <Card className="h-fit w-full text-sm">
      <CardHeader>
        <p>Players ({formatNumberWithCommas(skin.uniqueOwners)})</p>
      </CardHeader>
      <CardContent className="flex h-64 flex-wrap gap-2 overflow-y-auto">
        {skin.accountsSeenUsing?.map(account => (
          <SimpleLink key={account} href={`/player/${account}`}>
            <p>{account}</p>
          </SimpleLink>
        ))}
        {skin.accountsSeenUsing && skin.accountsSeenUsing.length < skin.uniqueOwners && (
          <p>+ {formatNumberWithCommas(skin.uniqueOwners - skin.accountsSeenUsing.length)} more...</p>
        )}
      </CardContent>
    </Card>
  );
}
