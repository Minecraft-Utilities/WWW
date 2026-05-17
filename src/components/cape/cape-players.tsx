import { formatNumberWithCommas } from "@/common/utils";
import { Cape } from "mcutils-js-api/dist/types/player/cape/cape";
import OwnerCount from "../owner-count";
import SimpleLink from "../simple-link";
import Card, { CardContent, CardHeader } from "../ui/card";

interface CapePlayersProps {
  cape: Cape;
}

export default function CapePlayers({ cape }: CapePlayersProps) {
  return (
    <Card className="h-105 w-full text-sm">
      <CardHeader>
        <OwnerCount count={cape.uniqueOwners} name="Owners" />
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 overflow-y-auto">
        {cape.accountsSeenOwning?.map(account => (
          <SimpleLink key={account} href={`/player/${account}`}>
            <p>{account}</p>
          </SimpleLink>
        ))}
        {cape.accountsSeenOwning && cape.accountsSeenOwning.length < cape.uniqueOwners && (
          <p className="text-muted-foreground">
            + {formatNumberWithCommas(cape.uniqueOwners - cape.accountsSeenOwning.length)} more...
          </p>
        )}
      </CardContent>
    </Card>
  );
}
