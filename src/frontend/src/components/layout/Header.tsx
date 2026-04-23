import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, Zap } from "lucide-react";

interface HeaderProps {
  showBack?: boolean;
  backLabel?: string;
  backTo?: string;
  subtitle?: string;
}

export function Header({
  showBack = false,
  backLabel = "Proyectos",
  backTo = "/",
  subtitle,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 py-3 flex flex-col gap-0.5">
        {showBack && (
          <button
            type="button"
            data-ocid="header.back_button"
            onClick={() => router.history.back()}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 mb-1 -ml-0.5 w-fit"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link to={backTo} className="hover:text-foreground">
              {backLabel}
            </Link>
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-primary/20 border border-primary/30 flex-shrink-0">
            <Zap className="w-4 h-4 text-primary" fill="currentColor" />
          </div>

          <div className="min-w-0">
            <h1 className="text-base font-bold font-display text-foreground leading-tight tracking-tight">
              ElectroCalc <span className="text-primary">NB 777</span>
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-wider uppercase font-mono truncate">
              {subtitle ?? "Calculadora según Norma Boliviana NB 777"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
