"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerType } from "mcutils-js-api/dist/types/server/server";
import { Coffee, Layers } from "lucide-react";
import { cn } from "@/common/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serverAddress: string;
  onSelectEdition: (edition: ServerType) => void;
};

const editionOptions: {
  type: ServerType;
  label: string;
  icon: typeof Coffee;
  description: string;
}[] = [
  { type: "java", label: "Java", icon: Coffee, description: "PC, Mac, Linux" },
  {
    type: "bedrock",
    label: "Bedrock",
    icon: Layers,
    description: "Console, Mobile, Windows 10",
  },
];

export default function ServerEditionDialog({
  open,
  onOpenChange,
  serverAddress,
  onSelectEdition,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl">Choose server edition</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            Which edition is{" "}
            <span className="font-mono font-medium text-foreground bg-accent/50 px-1.5 py-0.5 rounded border border-border">
              {serverAddress}
            </span>{" "}
            running?
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 pt-2">
          {editionOptions.map(({ type, label, icon: Icon, description }) => (
            <button
              key={type}
              type="button"
              onClick={() => onSelectEdition(type)}
              className={cn(
                "group flex flex-col items-center gap-2 rounded-lg border-2 border-border bg-card/50 p-4 transition-all text-center",
                "hover:border-primary/50 hover:bg-accent/30 hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent/50 text-muted-foreground transition-colors group-hover:bg-primary/20 group-hover:text-primary">
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <span className="font-semibold text-foreground">{label}</span>
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
