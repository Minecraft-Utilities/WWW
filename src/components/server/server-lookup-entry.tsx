import { cn } from "@/common/utils";
import { ServerRegistryEntry } from "mcutils-js-api/dist/types/server-registry/server-registry-entry";

interface ServerLookupEntryProps {
  entry: ServerRegistryEntry;
  handleServerEntryClick: (entry: ServerRegistryEntry) => void;
}

export default function ServerLookupEntry({ entry, handleServerEntryClick }: ServerLookupEntryProps) {
  return (
    <div className="relative overflow-hidden rounded-sm">
      {entry.backgroundImageUrl && (
        <div
          className="absolute inset-0 -m-3"
          style={{
            backgroundImage: `url(${entry.backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
          }}
          aria-hidden
        />
      )}
      <button
        type="button"
        role="option"
        className={cn(
          "relative z-10 flex w-full flex-col items-start gap-0.5 rounded-sm px-4 py-2 text-left text-sm transition-colors outline-none",
          entry.backgroundImageUrl
            ? "bg-background/60 hover:bg-accent/70 focus:bg-accent/70"
            : "hover:bg-accent focus:bg-accent"
        )}
        onClick={() => handleServerEntryClick(entry)}
      >
        <span className="font-medium">{entry.displayName}</span>
        <span className="text-muted-foreground text-xs">
          {entry.hostnames[0]} · {entry.platform}
        </span>
      </button>
    </div>
  );
}
