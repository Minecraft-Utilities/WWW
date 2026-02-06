export default function CapesLoading() {
  return (
    <div
      className="mt-24 flex w-full flex-col items-center justify-center gap-24"
      aria-live="polite"
      aria-busy="true"
    >
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <div className="bg-muted/30 h-10 w-48 animate-pulse rounded-md" />
        <div className="bg-muted/30 h-5 w-72 max-w-full animate-pulse rounded-md" />
      </header>
      <div className="flex max-w-6xl flex-wrap justify-center gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-muted/30 h-44 w-52 animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
