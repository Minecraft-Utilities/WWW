"use client";

import { mcUtilsApi } from "@/common/mc-utils";
import { cn, isIpOrDomain } from "@/common/utils";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search, X } from "lucide-react";
import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";
import { ServerType } from "mcutils-js-api/dist/types/server/server";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import ServerEditionDialog from "./server-edition-dialog";

const querySearchSchema = z.object({
  query: z
    .string()
    .transform(s => s.trim())
    .pipe(z.string().min(1, "Enter a username, UUID, or server address")),
});

type QuerySearchValues = z.infer<typeof querySearchSchema>;

export interface QuerySearchProps {
  landingPage?: boolean;
  className?: string;
  setQueryError?: (invalid: ErrorResponse | undefined) => void;
}

export default function QuerySearch({ landingPage, className, setQueryError }: QuerySearchProps) {
  const router = useRouter();
  const [serverDialogOpen, setServerDialogOpen] = useState(false);
  const [pendingServer, setPendingServer] = useState("");
  const [isLookupLoading, setIsLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<ErrorResponse | undefined>(undefined);

  const form = useForm<QuerySearchValues>({
    resolver: zodResolver(querySearchSchema),
    defaultValues: { query: "" },
  });

  const queryValue = form.watch("query");

  const clearError = useCallback(() => {
    setLookupError(undefined);
    setQueryError?.(undefined);
  }, [setQueryError]);

  const onSubmit = useCallback(
    async (data: QuerySearchValues) => {
      const trimmed = data.query.trim();
      if (!trimmed) {
        return;
      }

      if (isIpOrDomain(trimmed)) {
        setPendingServer(trimmed);
        setServerDialogOpen(true);
        return;
      }

      setLookupError(undefined);
      setQueryError?.(undefined);
      setIsLookupLoading(true);
      try {
        const result = await mcUtilsApi.fetchPlayer(trimmed);
        if (result.error) {
          setLookupError(result.error);
          setQueryError?.(result.error);
          return;
        }
        router.push(`/player/${encodeURIComponent(trimmed)}`);
        form.reset();
      } finally {
        setIsLookupLoading(false);
      }
    },
    [router, form, setQueryError]
  );

  const handleServerEdition = useCallback(
    (edition: ServerType) => {
      if (!pendingServer) return;
      router.push(`/server/${edition}/${encodeURIComponent(pendingServer)}`);
      form.reset();
      setPendingServer("");
      setServerDialogOpen(false);
    },
    [pendingServer, router, form]
  );

  return (
    <form
      role="search"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-2 md:flex-row md:gap-0"
    >
      <InputGroup className={cn("w-full", className)}>
        <Controller
          name="query"
          control={form.control}
          render={({ field, fieldState }) => (
            <InputGroupInput
              {...field}
              type="text"
              placeholder="Search..."
              aria-invalid={fieldState.invalid || !!lookupError}
              disabled={isLookupLoading}
              onChange={e => {
                field.onChange(e);
                if (lookupError) clearError();
              }}
            />
          )}
        />

        <InputGroupAddon>
          {isLookupLoading ? (
            <Loader2 className="text-muted-foreground size-4 animate-spin" />
          ) : (
            <Search className="text-muted-foreground size-4" />
          )}
        </InputGroupAddon>

        <InputGroupAddon align="inline-end" className="min-w-9">
          <InputGroupButton
            type="button"
            size="icon-xs"
            variant="ghost"
            aria-label="Clear search"
            disabled={isLookupLoading}
            className={cn(queryValue.length === 0 && "pointer-events-none invisible")}
            onClick={() => {
              form.setValue("query", "");
              clearError();
            }}
          >
            <X className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {landingPage && (
        <Button type="submit" className="block w-full md:hidden" disabled={isLookupLoading}>
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
