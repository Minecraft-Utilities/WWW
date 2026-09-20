"use client";

import { formatNumberWithCommas } from "@/common/utils";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { colorFor, formatPercent } from "./chart-utils";

interface PieBreakdownProps {
  /** Raw key -> count breakdown from the API (eg: platform name, protocol number, country code). */
  data: Record<string, number>;
  /** Display name per key, precomputed by the server (eg: capitalized platform, version label, flag + country). */
  labels: Record<string, string>;
  /** Label shown under the count in the center of the donut. */
  centerLabel: string;
  /** Message shown when the breakdown is empty. */
  emptyMessage: string;
  /** `protocol` renders the tooltip title as "Protocol <key> (Minecraft <label>)". */
  tooltipMode?: "default" | "protocol";
}

export default function PieBreakdown({
  data,
  labels,
  centerLabel,
  emptyMessage,
  tooltipMode = "default",
}: PieBreakdownProps) {
  const entries = Object.entries(data)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  const displayName = (name: string) => labels[name] ?? name;

  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground flex h-48 items-center justify-center text-sm">{emptyMessage}</p>
    );
  }

  const chartData = entries.map(([name, count]) => ({ name, count }));
  const config: ChartConfig = {};
  entries.forEach(([name], index) => {
    config[name] = { label: displayName(name), color: colorFor(name, index) };
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative size-48 shrink-0"
        role="img"
        aria-label={`${centerLabel}: ${entries
          .map(([name, count]) => `${displayName(name)} (${formatNumberWithCommas(count)})`)
          .join(", ")}`}
      >
        <ChartContainer config={config} className="absolute inset-0 aspect-auto">
          <PieChart>
            <ChartTooltip
              content={props => (
                <ChartTooltipContent
                  {...props}
                  hideLabel={tooltipMode !== "protocol"}
                  labelFormatter={
                    tooltipMode === "protocol"
                      ? (label, payload) => {
                          const name = String(payload?.[0]?.name ?? label ?? "");
                          const version = displayName(name);
                          return version === name
                            ? `Protocol ${name}`
                            : `Protocol ${name} (Minecraft ${version})`;
                        }
                      : undefined
                  }
                  formatter={value =>
                    `${formatNumberWithCommas(Number(value))} servers (${formatPercent(Number(value), total)})`
                  }
                />
              )}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={62}
              outerRadius={76}
              paddingAngle={2}
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={colorFor(entry.name, index)} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-foreground text-2xl font-semibold tabular-nums">
            {formatNumberWithCommas(total)}
          </p>
          <p className="text-muted-foreground text-[10px]">{centerLabel}</p>
        </div>
      </div>

      <ul className="flex w-full min-w-0 flex-col gap-1.5">
        {entries.map(([name, count], index) => (
          <li key={name} className="flex items-center gap-2 text-sm">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: colorFor(name, index) }}
            />
            <span className="text-muted-foreground min-w-0 flex-1 truncate">{displayName(name)}</span>
            <span className="tabular-nums">{formatNumberWithCommas(count)}</span>
            <span className="text-muted-foreground w-12 shrink-0 text-right text-xs tabular-nums">
              {formatPercent(count, total)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
