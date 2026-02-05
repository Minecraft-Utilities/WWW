export default function DetailRow({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "success" | "warning";
}) {
  const variantClasses = {
    default:
      "rounded-md border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-sm text-foreground",
    success:
      "rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-sm text-emerald-600 dark:text-emerald-400",
    warning:
      "rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-sm text-amber-600 dark:text-amber-400",
  };
  return (
    <div className="flex flex-col gap-1.5 py-1.5 xs:flex-row xs:flex-wrap xs:items-center xs:justify-between xs:gap-2">
      <span className="shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className={`min-w-0 break-all ${variantClasses[variant]}`}>
        {value}
      </span>
    </div>
  );
}
