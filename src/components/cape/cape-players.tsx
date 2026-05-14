import { formatNumberWithCommas } from "@/common/utils";
import { Cape } from "mcutils-js-api/dist/types/player/cape/cape";
import SimpleLink from "../simple-link";
import Card, { CardContent, CardHeader } from "../ui/card";

interface CapePlayersProps {
  cape: Cape;
}

export default function CapePlayers({ cape }: CapePlayersProps) {
  return (
    <Card className="h-fit w-full text-sm">
      <CardHeader>
        <p>Players ({formatNumberWithCommas(cape.uniqueOwners)})</p>
      </CardHeader>
      <CardContent className="flex h-64 flex-wrap gap-2 overflow-y-auto">
        {cape.accountsSeenOwning?.map(account => (
          <SimpleLink key={account} href={`/player/${account}`}>
            <p>{account}</p>
          </SimpleLink>
        ))}
        {cape.accountsSeenOwning && cape.accountsSeenOwning.length < cape.uniqueOwners && (
          <p>+ {formatNumberWithCommas(cape.uniqueOwners - cape.accountsSeenOwning.length)} more...</p>
        )}
      </CardContent>
    </Card>
  );
}
