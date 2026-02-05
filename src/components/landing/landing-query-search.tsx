"use client";

import { useState } from "react";
import QuerySearch from "../lookup/query-search";
import Card from "../ui/card";

export default function LandingQuerySearch() {
  const [queryError, setQueryError] = useState(false);

  return (
    <div className="flex flex-col">
      <Card className="rounded-b-none bg-secondary/70">
        <QuerySearch landingPage setQueryError={setQueryError} />
      </Card>
      <Card className="rounded-t-none bg-secondary/90 text-sm">
        {queryError ? (
          <p className="text-destructive">Player not found or invalid query</p>
        ) : (
          <p className="text-muted-foreground">
            Enter a Username / UUID / Domain to get started.
          </p>
        )}
      </Card>
    </div>
  );
}
