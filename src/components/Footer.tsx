import { ShieldLogo } from "./ShieldLogo";

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-12 py-8 px-6 glass">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldLogo className="h-6 w-6" />
          <p className="text-sm text-muted-foreground text-center md:text-left">
            <span className="neon-text font-display font-bold">DeepShield AI</span> — Protecting Digital Identity with Real-Time Multimodal Intelligence
          </p>
        </div>
        <div className="text-xs text-muted-foreground font-mono">© 2026 · v1.0.0 · SECURE</div>
      </div>
    </footer>
  );
}
