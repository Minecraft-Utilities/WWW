export default function ServerLoading() {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-6" aria-live="polite" aria-busy="true">
      <header className="flex min-w-0 flex-1 flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted/30 size-16 animate-pulse rounded-md" />
          <div className="bg-muted/30 h-10 w-64 animate-pulse rounded-md" />
        </div>
      </header>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="bg-muted/30 h-32 w-full animate-pulse rounded-2xl" />
        <div className="bg-muted/30 h-64 w-full animate-pulse rounded-2xl" />
      </div>
    </div>
  );
}
