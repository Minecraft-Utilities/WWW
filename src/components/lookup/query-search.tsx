"use client";

import { cn, isIpOrDomain } from "@/app/common/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function QuerySearch({
  landingPage,
  className,
}: {
  landingPage?: boolean;
  className?: string;
}) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleRedirect(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // no search
    if (!search.trim()) {
      return;
    }

    // redirect the user to the correct page
    if (isIpOrDomain(search)) {
      router.push(`/server/${search}`);
    } else {
      router.push(`/player/${search}`);
    }

    setSearch("");
  }

  return (
    <form onSubmit={handleRedirect} className="flex flex-row items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className={cn(
            landingPage ? "rounded-r-none" : "",
            "w-68 pl-9",
            className,
          )}
          type="text"
          placeholder="Player / Server Lookup..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {landingPage && (
        <Button className="rounded-l-none">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      )}
    </form>
  );
}
