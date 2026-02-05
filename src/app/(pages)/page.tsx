import QuerySearch from "@/components/lookup/query-search";
import Card from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex h-full items-center w-full justify-center mt-12">
      <Card className="flex flex-col gap-2 w-full max-w-[450px]">
        <p className="font-semibold">Minecraft Player / Server Lookup</p>
        <QuerySearch landingPage />
      </Card>
    </div>
  );
}
