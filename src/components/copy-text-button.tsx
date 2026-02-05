"use client";

import { CopyIcon } from "lucide-react";
import SimpleTooltip from "./simple-tooltip";

export default function CopyTextButton({
  text,
  tooltip,
}: {
  text: string;
  tooltip: string;
}) {
  return (
    <SimpleTooltip display={tooltip}>
      <button
        onClick={() => {
          navigator.clipboard.writeText(text);
        }}
      >
        <CopyIcon className="text-input size-4 cursor-pointer" />
      </button>
    </SimpleTooltip>
  );
}
