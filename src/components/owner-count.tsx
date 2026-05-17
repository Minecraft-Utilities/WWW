"use client";

import { UserIcon } from "lucide-react";
import CountUp from "react-countup";

export default function OwnerCount({ count, name }: { count: number; name?: string }) {
  return (
    <div className="flex items-center gap-1">
      <UserIcon className="size-3.5 text-white/60" />
      <span className="text-xs text-white/60">
        <CountUp end={count} preserveValue /> {name}
      </span>
    </div>
  );
}
