"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import SimpleTooltip from "./simple-tooltip";

export interface CopyTextButtonProps {
  text: string;
  tooltip: string;
}

export default function CopyTextButton({ text, tooltip }: CopyTextButtonProps) {
  return (
    <SimpleTooltip display={tooltip}>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={tooltip}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard");
          } catch {
            toast.error("Failed to copy");
          }
        }}
      >
        <CopyIcon className="text-input size-4" />
      </Button>
    </SimpleTooltip>
  );
}
