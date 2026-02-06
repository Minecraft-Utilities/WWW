"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import SimpleTooltip from "./simple-tooltip";

export default function CopyTextButton({ text, tooltip }: { text: string; tooltip: string }) {
  return (
    <SimpleTooltip display={tooltip}>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={tooltip}
        onClick={() => {
          navigator.clipboard.writeText(text);
          toast.success(`Copied to clipboard`);
        }}
      >
        <CopyIcon className="text-input size-4" />
      </Button>
    </SimpleTooltip>
  );
}
