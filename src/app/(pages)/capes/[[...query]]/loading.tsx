import CapeCardSkeleton from "@/components/skeleton/capes/cape-card-skeleton";
import PaginationSkeleton from "@/components/skeleton/ui/pagination-skeleton";

export default function CapesLoading() {
  return (
    <div
      className="mt-16 flex w-full flex-col items-center justify-center gap-16"
      aria-live="polite"
      aria-busy="true"
    >
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <h1 className="text-foreground text-center text-4xl font-bold tracking-tight">Capes</h1>
        <p className="text-muted-foreground text-center text-sm">A list of all known capes in Minecraft</p>
      </header>
      <div className="flex max-w-5xl flex-wrap items-center justify-center gap-6">
        <PaginationSkeleton />
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 25 }).map((_, i) => (
            <CapeCardSkeleton key={i} />
          ))}
        </div>
        <PaginationSkeleton />
      </div>
    </div>
  );
}
