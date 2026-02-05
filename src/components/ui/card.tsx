import clsx, { ClassValue } from "clsx";

type Props = {
  children: React.ReactNode;
  className?: ClassValue;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "bg-card/80 border-border flex flex-col rounded-2xl border p-(--spacing-lg)",
        className,
      )}
    >
      {children}
    </div>
  );
}
