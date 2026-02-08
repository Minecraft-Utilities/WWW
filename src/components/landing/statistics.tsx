"use client";

import { mcUtilsApi } from "@/common/mc-utils";
import { TimeUnit } from "@/common/time-utils";
import { formatNumberWithCommas } from "@/common/utils";
import { useQuery } from "@tanstack/react-query";
import SimpleTooltip from "../simple-tooltip";
import Card, { CardContent, CardHeader } from "../ui/card";

export default function Statistics() {
  const { data, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => mcUtilsApi.fetchStatistics(),
    refetchInterval: TimeUnit.toMillis(TimeUnit.Second, 30),
  });

  if (isLoading || !data?.statistics) {
    return null;
  }

  return (
    <div className="mt-8 flex w-full flex-row gap-4">
      <Card className="w-full">
        <CardHeader>Stored Minecraft Profiles</CardHeader>
        <CardContent className="text-xl">
          <SimpleTooltip
            display={<p>The number of Java Minecraft profiles that have been stored in our database.</p>}
          >
            {formatNumberWithCommas(data.statistics.seenPlayers)}
          </SimpleTooltip>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>Skin Collection Size</CardHeader>
        <CardContent className="text-xl">
          <SimpleTooltip display={<p>The number of unique skins that have been stored in our database.</p>}>
            {formatNumberWithCommas(data.statistics.seenSkins)}
          </SimpleTooltip>
        </CardContent>
      </Card>
    </div>
  );
}
