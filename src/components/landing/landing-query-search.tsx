"use client";

import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";
import { useState } from "react";
import QuerySearch from "../lookup/query-search";
import Card from "../ui/card";

export default function LandingQuerySearch() {
  const [queryError, setQueryError] = useState<ErrorResponse | undefined>(undefined);

  return (
    <div className="flex w-full flex-col">
      <Card className="bg-secondary/70 rounded-b-none border-b-0">
        <QuerySearch landingPage setQueryError={setQueryError} />
      </Card>
      <Card className="bg-secondary/90 rounded-t-none text-sm">
        {queryError ? (
          <p className="text-destructive">{queryError.message}</p>
        ) : (
          <p className="text-muted-foreground">Enter a Username / UUID / Domain to get started.</p>
        )}
      </Card>
    </div>
  );
}
