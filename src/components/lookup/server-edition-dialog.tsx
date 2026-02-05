"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerType } from "mcutils-js-api/dist/types/server/server";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serverAddress: string;
  onSelectEdition: (edition: ServerType) => void;
};

export default function ServerEditionDialog({
  open,
  onOpenChange,
  serverAddress,
  onSelectEdition,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>Server edition</DialogTitle>
          <DialogDescription>
            Is{" "}
            <span className="font-mono font-medium text-foreground">
              {serverAddress}
            </span>{" "}
            a Java or Bedrock server?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton={false} className="gap-2 sm:gap-0">
          <Button onClick={() => onSelectEdition("java")}>Java</Button>
          <Button variant="outline" onClick={() => onSelectEdition("bedrock")}>
            Bedrock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
