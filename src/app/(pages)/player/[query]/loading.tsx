import PlayerCapesCardSkeleton from "@/components/skeleton/player/player-capes-card-skeleton";
import PlayerDetailsSkeleton from "@/components/skeleton/player/player-details-skeleton";
import PlayerHeaderSkeleton from "@/components/skeleton/player/player-header-skeleton";
import PlayerSkinCardSkeleton from "@/components/skeleton/player/player-skin-card-skeleton";
import PlayerSkinsCardSkeleton from "@/components/skeleton/player/player-skins-card-skeleton";
import PlayerUsernameHistorySkeleton from "@/components/skeleton/player/player-username-history-skeleton";

export default function PlayerLoading() {
  return (
    <div className="mt-16 flex w-full flex-col items-center gap-6" aria-live="polite" aria-busy="true">
      <div className="flex w-full flex-col items-center gap-16">
        <PlayerHeaderSkeleton />

        <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row">
          <section className="flex w-full flex-col gap-4 md:max-w-88 md:[&_>div]:border-r-0">
            <PlayerSkinCardSkeleton />
            <PlayerSkinsCardSkeleton />
            <PlayerCapesCardSkeleton />
          </section>

          <div className="flex min-w-0 flex-1 flex-col gap-4 md:[&_>div]:border-l-0">
            <PlayerDetailsSkeleton />
            <PlayerUsernameHistorySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
