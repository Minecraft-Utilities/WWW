"use client";

import { useState } from "react";
import QuerySearch from "../lookup/query-search";
import Card from "../ui/card";
import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";

export default function LandingQuerySearch() {
  const [queryError, setQueryError] = useState<ErrorResponse | undefined>(
    undefined,
  );

  return (
    <div className="flex flex-col w-full">
      <Card className="rounded-b-none border-b-0 bg-secondary/70">
        <QuerySearch landingPage setQueryError={setQueryError} />
      </Card>
      <Card className="rounded-t-none bg-secondary/90 text-sm">
        {queryError ? (
          <p className="text-destructive">{queryError.message}</p>
        ) : (
          <p className="text-muted-foreground">
            Enter a Username / UUID / Domain to get started.
          </p>
        )}
      </Card>
    </div>
  );
}
