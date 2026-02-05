import QuerySearch from "@/components/query-search";
import Card from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex h-full items-center justify-center mt-12">
      <div className="flex flex-col gap-4 items-center">
        <p className="font-semibold text-xl uppercase">
          Minecraft Player and Server Search
        </p>
        <Card>
          <QuerySearch className="w-[450px]" landingPage />
        </Card>
      </div>
    </div>
  );
}
