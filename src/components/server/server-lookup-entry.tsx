import { cn } from "@/common/utils";
import { ServerRegistryEntry } from "mcutils-js-api/dist/types/server-registry/server-registry-entry";

interface ServerLookupEntryProps {
  entry: ServerRegistryEntry;
  handleServerEntryClick: (entry: ServerRegistryEntry) => void;
}

export default function ServerLookupEntry({ entry, handleServerEntryClick }: ServerLookupEntryProps) {
  return (
    <button
      type="button"
      role="option"
      className={cn(
        "hover:bg-accent focus:bg-accent flex w-full flex-col items-start gap-0.5 rounded-sm px-4 py-2 text-left text-sm outline-none",
        "background-image: url(" +
          entry.backgroundImageUrl +
          "); background-size: cover; background-position: center;"
      )}
      onClick={() => handleServerEntryClick(entry)}
    >
      <span className="font-medium">{entry.displayName}</span>
      <span className="text-muted-foreground text-xs">
        {entry.hostnames[0]} · {entry.platform}
      </span>
    </button>
  );
}
