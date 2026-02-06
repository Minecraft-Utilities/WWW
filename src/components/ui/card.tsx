import clsx, { ClassValue } from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: ClassValue;
};

type CardHeaderProps = {
  children: React.ReactNode;
  className?: ClassValue;
  variant?: "default" | "destructive";
};

export function CardHeader({ children, className, variant = "default" }: CardHeaderProps) {
  return (
    <div
      className={clsx(
        "border-b px-4 py-3",
        variant === "default" && "border-border/60 bg-muted/20",
        variant === "destructive" && "border-destructive/50 bg-destructive/10",
        className
      )}
    >
      <p
        className={clsx(
          "text-xs font-medium tracking-wider uppercase",
          variant === "default" && "text-muted-foreground",
          variant === "destructive" && "text-destructive"
        )}
      >
        {children}
      </p>
    </div>
  );
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-card/80 border-border flex flex-col rounded-2xl border p-(--spacing-lg)",
        className
      )}
    >
      {children}
    </div>
  );
}
