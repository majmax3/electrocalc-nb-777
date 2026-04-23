import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { FormulaStep } from "../../types/electrical";
import { NormaTag } from "./NormaTag";

interface FormulaCardProps {
  step: FormulaStep;
  defaultExpanded?: boolean;
}

export function FormulaCard({
  step,
  defaultExpanded = false,
}: FormulaCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      className="border border-border rounded-sm bg-card overflow-hidden transition-smooth"
      data-ocid="formula.card"
    >
      {/* Collapsed header — always visible */}
      <button
        type="button"
        data-ocid="formula.toggle"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-secondary/40 transition-colors duration-200"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold font-display text-foreground truncate">
            {step.name}
          </span>
          <span className="text-xs font-mono text-accent font-bold flex-shrink-0">
            {step.result % 1 === 0
              ? step.result.toFixed(0)
              : step.result.toFixed(3)}{" "}
            <span className="text-muted-foreground font-normal">
              {step.unit}
            </span>
          </span>
        </div>
        <span className="text-muted-foreground flex-shrink-0 ml-2">
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border px-3 py-3 flex flex-col gap-2.5 bg-secondary/20">
          {/* Expression */}
          <div>
            <p className="tech-label mb-1">Expresión</p>
            <code className="formula-code block w-full">{step.expression}</code>
          </div>

          {/* Substitution */}
          <div>
            <p className="tech-label mb-1">Sustitución</p>
            <code className="formula-code block w-full text-foreground/80">
              {step.substitution}
            </code>
          </div>

          {/* Result */}
          <div className="flex items-center justify-between">
            <p className="tech-label">Resultado</p>
            <span className="text-base font-bold font-mono text-accent">
              {step.result % 1 === 0
                ? step.result.toFixed(2)
                : step.result.toFixed(4)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {step.unit}
              </span>
            </span>
          </div>

          {/* NB 777 reference */}
          <div className="pt-0.5">
            <NormaTag reference={step.nb777Ref} />
          </div>
        </div>
      )}
    </div>
  );
}
