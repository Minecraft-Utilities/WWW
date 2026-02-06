"use client";

import { ErrorResponse } from "mcutils-js-api/dist/types/response/error-response";
import { useState } from "react";
import QuerySearch from "../lookup/query-search";
import Card, { CardContent, CardFooter } from "@/components/ui/card";

export default function LandingQuerySearch() {
  const [queryError, setQueryError] = useState<ErrorResponse | undefined>(undefined);

  return (
    <div className="flex w-full flex-col">
      <Card className="flex w-full flex-col">
        <CardContent>
          <QuerySearch landingPage setQueryError={setQueryError} />
        </CardContent>
        <CardFooter>
          {queryError ? (
            <p className="text-destructive">{queryError.message}</p>
          ) : (
            <p className="text-muted-foreground">Enter a Username / UUID / Domain to get started.</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
