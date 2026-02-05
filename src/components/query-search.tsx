"use client";

import { cn, isIpOrDomain } from "@/app/common/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { Button } from "./ui/button";

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
      <Input
        className={cn(landingPage ? "rounded-r-none" : "", "w-64", className)}
        type="text"
        placeholder="Server or player search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {landingPage && <Button className="rounded-l-none">Search</Button>}
    </form>
  );
}
