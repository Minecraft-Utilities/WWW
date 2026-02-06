import Card from "../ui/card";

type Props = {
  username: string;
  uniqueId: string;
};

export default function PlayerDetails(_props: Props) {
  return (
    <Card className="flex h-fit flex-col overflow-hidden p-0">
      <div className="border-b border-border/60 bg-muted/20 px-4 py-3">
        <p className="text-base font-semibold text-foreground">
          Player Details
        </p>
      </div>
      <div className="p-4">
        <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-6">
          <p className="text-sm text-muted-foreground">Card Content</p>
        </div>
      </div>
    </Card>
  );
}
