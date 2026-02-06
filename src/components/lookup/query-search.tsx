"use client";

import { cn, isIpOrDomain } from "@/common/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check, Loader2, Search, X } from "lucide-react";
import ServerEditionDialog from "./server-edition-dialog";
import { ServerType } from "mcutils-js-api/dist/types/server/server";
import { useIsMobile } from "../context/viewport-context";
import { mcUtilsApi } from "@/common/mc-utils";
import { useDebounce } from "@uidotdev/usehooks";

export default function QuerySearch({
  landingPage,
  className,
  setQueryError,
}: {
  landingPage?: boolean;
  className?: string;
  setQueryError?: (invalid: boolean) => void;
}) {
  const router = useRouter();

  const [serverDialogOpen, setServerDialogOpen] = useState(false);
  const [pendingServer, setPendingServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidQuery, setInvalidQuery] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (!trimmed) {
      setLoading(false);
      setInvalidQuery(false);
      return;
    }
    if (isIpOrDomain(trimmed)) {
      setInvalidQuery(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    let cancelled = false;
    mcUtilsApi.fetchPlayer(trimmed).then((player) => {
      if (cancelled) {
        return;
      }
      setInvalidQuery(!!player.error);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (setQueryError) {
      setQueryError(invalidQuery);
    }
  }, [invalidQuery, setQueryError]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = debouncedSearch.trim();
    if (!trimmed) {
      return;
    }

    if (isIpOrDomain(trimmed)) {
      setPendingServer(trimmed);
      setServerDialogOpen(true);
      return;
    }
    if (invalidQuery) {
      return;
    }
    router.push(`/player/${encodeURIComponent(trimmed)}`);
  }

  function handleServerEdition(edition: ServerType) {
    if (!pendingServer) {
      return;
    }
    router.push(`/server/${edition}/${encodeURIComponent(pendingServer)}`);
    setSearch("");
    setPendingServer("");
    setServerDialogOpen(false);
  }

  const showSearchIcon =
    debouncedSearch.length <= 0 ||
    invalidQuery ||
    isIpOrDomain(debouncedSearch);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col gap-2 md:flex-row md:gap-0"
    >
      <InputGroup className={cn("w-full", className)}>
        <InputGroupInput
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-invalid={invalidQuery}
        />

        <InputGroupAddon>
          {loading ? (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          ) : showSearchIcon ? (
            <Search className="size-4 text-muted-foreground" />
          ) : (
            <Check className="size-4 text-green-500" />
          )}
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">
          {search.length > 0 && (
            <InputGroupButton
              type="button"
              size="icon-xs"
              variant="ghost"
              aria-label="Clear"
              onClick={() => setSearch("")}
            >
              <X className="size-4" />
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>

      {landingPage && (
        <Button className="block md:hidden w-full">Search</Button>
      )}

      <ServerEditionDialog
        open={serverDialogOpen}
        onOpenChange={setServerDialogOpen}
        serverAddress={pendingServer}
        onSelectEdition={handleServerEdition}
      />
    </form>
  );
}
