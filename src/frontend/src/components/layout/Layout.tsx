import type { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  showBack?: boolean;
  backLabel?: string;
  backTo?: string;
  headerSubtitle?: string;
}

export function Layout({
  children,
  showBack = false,
  backLabel,
  backTo,
  headerSubtitle,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header
        showBack={showBack}
        backLabel={backLabel}
        backTo={backTo}
        subtitle={headerSubtitle}
      />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-5 flex flex-col">
        {children}
      </main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-mono">
            NB 777 · RTDE Bolivia
          </span>
          <span className="text-[10px] text-muted-foreground">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
