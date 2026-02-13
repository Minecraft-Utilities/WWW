import { cn } from "@/common/utils";
import CopyTextButton from "./copy-text-button";

const variantClasses = {
  default: "rounded-md border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-sm text-foreground",
  success:
    "rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-sm text-emerald-600 dark:text-emerald-400",
  warning:
    "rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-sm text-amber-600 dark:text-amber-400",
} as const;

export type DetailRowVariant = keyof typeof variantClasses;

export interface DetailRowProps {
  label: string;
  value: string;
  variant?: DetailRowVariant;
  copyable?: boolean;
}

export default function DetailRow({ label, value, variant = "default", copyable = false }: DetailRowProps) {
  return (
    <div className="xs:flex-row xs:flex-wrap xs:items-center xs:justify-between xs:gap-2 flex flex-col gap-1.5 py-1.5 first:pt-0 last:pb-0">
      <span className="text-muted-foreground shrink-0 text-sm select-none">{label}</span>

      <div className="flex items-center gap-2">
        {copyable && <CopyTextButton text={value} tooltip="Copy to clipboard" />}
        <span className={cn("min-w-0 break-all", variantClasses[variant])}>{value}</span>
      </div>
    </div>
  );
}
