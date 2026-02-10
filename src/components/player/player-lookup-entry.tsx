import { cn } from "@/common/utils";
import type { PlayerSearchEntry } from "mcutils-js-api/dist/types/player/player-search-entry";

interface PlayerLookupEntryProps {
  entry: PlayerSearchEntry;
  onSelect: (entry: PlayerSearchEntry) => void;
}

export default function PlayerLookupEntry({ entry, onSelect }: PlayerLookupEntryProps) {
  return (
    <button
      type="button"
      role="option"
      className={cn(
        "flex w-full items-center gap-3 rounded-sm px-4 py-2 text-left text-sm transition-colors outline-none",
        "hover:bg-accent focus:bg-accent"
      )}
      onClick={() => onSelect(entry)}
    >
      <img
        src={entry.skin.parts.HEAD}
        alt=""
        className="size-8 rounded-sm object-cover"
        width={32}
        height={32}
      />
      <span className="font-medium">{entry.username}</span>
    </button>
  );
}
