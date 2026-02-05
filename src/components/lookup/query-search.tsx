"use client";

import { cn, isIpOrDomain } from "@/app/common/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check, Loader2, Search } from "lucide-react";
import ServerEditionDialog from "./server-edition-dialog";
import { ServerType } from "mcutils-js-api/dist/types/server/server";
import { useIsMobile } from "../context/viewport-context";
import { mcUtilsApi } from "@/app/common/mc-utils";
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col gap-2 md:flex-row md:gap-0"
    >
      <div className="relative flex w-full">
        {loading ? (
          <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
        ) : debouncedSearch.length <= 0 || invalidQuery ? (
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        ) : (
          <Check className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
        )}

        <Input
          className={cn(
            landingPage ? "md:rounded-r-none" : "",
            "pl-9 w-full",
            invalidQuery
              ? "border-destructive/50 focus-visible:ring-destructive/50 hover:border-destructive/50"
              : "",
            className,
          )}
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {landingPage && (
        <Button className="md:rounded-l-none">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
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
