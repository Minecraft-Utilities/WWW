import { formatNumberWithCommas } from "@/common/utils";
import { SkinDTO } from "mcutils-js-api/dist/types/response/skin/skin-dto";
import SimpleLink from "../simple-link";
import Card, { CardContent, CardHeader } from "../ui/card";

interface SkinPlayersProps {
  skin: SkinDTO;
}

export default function SkinPlayers({ skin }: SkinPlayersProps) {
  return (
    <Card className="h-fit w-full text-sm">
      <CardHeader>
        <p>Players ({formatNumberWithCommas(skin.accountsUsed)})</p>
      </CardHeader>
      <CardContent className="flex h-64 flex-wrap gap-2 overflow-y-auto">
        {skin.accountsSeenUsing.map(account => (
          <SimpleLink key={account} href={`/player/${account}`}>
            <p>{account}</p>
          </SimpleLink>
        ))}
        {skin.accountsSeenUsing.length < skin.accountsUsed && (
          <p>+ {formatNumberWithCommas(skin.accountsUsed - skin.accountsSeenUsing.length)} more...</p>
        )}
      </CardContent>
    </Card>
  );
}
