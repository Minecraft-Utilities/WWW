"use client";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import SimpleTooltip from "./simple-tooltip";

export default function CopyTextButton({ text, tooltip }: { text: string; tooltip: string }) {
  return (
    <SimpleTooltip display={tooltip}>
      <button
        onClick={() => {
          navigator.clipboard.writeText(text);
          toast.success(`Copied ${text} to clipboard`);
        }}
      >
        <CopyIcon className="text-input size-4 cursor-pointer" />
      </button>
    </SimpleTooltip>
  );
}
