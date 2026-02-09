import PaginationSkeleton from "@/components/skeleton/ui/pagination-skeleton";
import SkinCardSkeleton from "@/components/skeleton/skins/skin-card-skeleton";

export default function SkinsLoading() {
  return (
    <div
      className="mt-24 flex w-full flex-col items-center justify-center gap-24"
      aria-live="polite"
      aria-busy="true"
    >
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <h1 className="text-foreground text-center text-4xl font-bold tracking-tight">Skins</h1>
        <p className="text-muted-foreground text-center text-sm">The list of all seen skins for players</p>
      </header>
      <div className="flex max-w-5xl flex-wrap items-center justify-center gap-6">
        <PaginationSkeleton />
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 25 }).map((_, i) => (
            <SkinCardSkeleton key={i} />
          ))}
        </div>
        <PaginationSkeleton />
      </div>
    </div>
  );
}
