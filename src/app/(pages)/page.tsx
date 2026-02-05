import QuerySearch from "@/components/lookup/query-search";
import Card from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex h-full items-center justify-center mt-12">
      <Card className="flex flex-col gap-2">
        <p className="font-semibold">Minecraft Player / Server Lookup</p>
        <QuerySearch className="w-[450px]" landingPage />
      </Card>
    </div>
  );
}
