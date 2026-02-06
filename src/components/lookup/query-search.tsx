"use client";

import { mcUtilsApi } from "@/common/mc-utils";
import { cn, isIpOrDomain } from "@/common/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Check, Loader2, Search, X } from "lucide-react";
import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";
import { ServerType } from "mcutils-js-api/dist/types/server/server";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import ServerEditionDialog from "./server-edition-dialog";

export default function QuerySearch({
  landingPage,
  className,
  setQueryError,
}: {
  landingPage?: boolean;
  className?: string;
  setQueryError?: (invalid: ErrorResponse | undefined) => void;
}) {
  const router = useRouter();
  const [serverDialogOpen, setServerDialogOpen] = useState(false);
  const [pendingServer, setPendingServer] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const trimmed = debouncedSearch.trim();
  const shouldLookup = trimmed.length > 0 && !isIpOrDomain(trimmed);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["player", "lookup", trimmed],
    queryFn: () => mcUtilsApi.fetchPlayer(trimmed),
    enabled: shouldLookup,
    staleTime: 30_000,
  });

  const invalidQuery = shouldLookup ? data?.error : undefined;

  useEffect(() => {
    setQueryError?.(invalidQuery);
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
          aria-invalid={!!invalidQuery}
        />

        <InputGroupAddon>
          {isFetching || isLoading ? (
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
