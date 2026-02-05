import Link from "next/link";
import Card from "../ui/card";

export default function LandingExample({
  name,
  icon,
  href,
}: {
  name: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="w-full">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm font-medium text-foreground">{name}</p>
        </div>
      </Card>
    </Link>
  );
}
