"use client";

import { Input } from "@/components/ui/input";
import { mcUtilsApi } from "@/app/common/mc-utils";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import { useState } from "react";

export default function ServerSearch() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const shouldSearch = debouncedSearch.length > 0;

  const { data, isLoading } = useQuery({
    queryKey: ["serverSearch", debouncedSearch, shouldSearch],
    queryFn: () => mcUtilsApi.fetchJavaServer(debouncedSearch),
    enabled: shouldSearch
  });

  return (
    <div className="flex flex-col gap-2 items-center">
      <Input
        className="w-64"
        type="text"
        placeholder="Search for a Java Server"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading && <div>Loading...</div>}
      {data?.error && <div>Error: {data.error.message}</div>}

      {data?.server && (
        <div>
          <Image
            src={data.server.motd.preview}
            alt="Server Preview"
            width={600}
            height={1}
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
