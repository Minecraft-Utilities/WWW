export default function PlayerLoading() {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-6" aria-live="polite" aria-busy="true">
      <div className="bg-muted/30 flex h-24 w-24 animate-pulse rounded-full" />
      <div className="flex flex-col items-center gap-2">
        <div className="bg-muted/30 h-9 w-48 animate-pulse rounded-md" />
        <div className="bg-muted/30 h-6 w-72 max-w-full animate-pulse rounded-md" />
      </div>
      <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:max-w-88">
          <div className="bg-muted/30 h-64 w-full animate-pulse rounded-lg" />
          <div className="bg-muted/30 h-32 w-full animate-pulse rounded-lg" />
        </div>
        <div className="bg-muted/30 h-64 w-full animate-pulse rounded-lg md:flex-1" />
      </div>
    </div>
  );
}
