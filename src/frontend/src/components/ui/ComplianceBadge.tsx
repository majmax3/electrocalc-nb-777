import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface ComplianceBadgeProps {
  complies: boolean;
  label?: string;
  size?: "sm" | "md";
}

export function ComplianceBadge({
  complies,
  label,
  size = "md",
}: ComplianceBadgeProps) {
  const defaultLabel = complies ? "Cumple NB 777" : "No cumple NB 777";
  const displayLabel = label ?? defaultLabel;

  return (
    <span
      data-ocid={complies ? "compliance.success" : "compliance.warning"}
      style={
        complies
          ? {
              color: "oklch(0.6 0.16 150)",
              backgroundColor: "oklch(0.6 0.16 150 / 0.1)",
              borderColor: "oklch(0.6 0.16 150 / 0.3)",
            }
          : undefined
      }
      className={cn(
        "inline-flex items-center gap-1 rounded-sm font-mono font-semibold border",
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1",
        !complies && "text-destructive bg-destructive/10 border-destructive/30",
      )}
    >
      {complies ? (
        <CheckCircle2
          className={cn(size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5")}
        />
      ) : (
        <XCircle className={cn(size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5")} />
      )}
      {complies ? "✓" : "✗"} {displayLabel}
    </span>
  );
}
