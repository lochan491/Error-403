import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload, Radar, Play, Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/detection")({
  head: () => ({
    meta: [
      { title: "Live Detection — DeepShield AI" },
      { name: "description", content: "Real-time multimodal deepfake detection on video and audio." },
    ],
  }),
  component: Detection,
});

type Verdict = { label: "REAL" | "FAKE"; score: number; model: string } | null;

function Detection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [verdict, setVerdict] = useState<Verdict>(null);

  const runScan = (forceFake = false) => {
    setVerdict(null);
    setScanning(true);
    setTimeout(() => {
      const isFake = forceFake || Math.random() > 0.5;
      setVerdict({
        label: isFake ? "FAKE" : "REAL",
        score: isFake ? 88 + Math.random() * 10 : 92 + Math.random() * 7,
        model: isFake ? ["StyleGAN3", "Diffusion · SD-Video", "FaceShifter"][Math.floor(Math.random() * 3)] : "—",
      });
      setScanning(false);
    }, 1800);
  };

  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          Live <span className="neon-text">Detection</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Upload a clip or run a demo scan to test the multimodal pipeline.</p>
      </div>

      <div className="glass-strong rounded-2xl p-6 space-y-5">
        <div
          className="relative border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-neon-blue/60 transition-all cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*,audio/*"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <Upload className="h-10 w-10 mx-auto text-neon-cyan mb-3" />
          <div className="font-display font-bold">Drop a video or audio file</div>
          <div className="text-xs text-muted-foreground mt-1">
            {fileName ?? "MP4, MOV, WAV, MP3 · max 100MB"}
          </div>
          {scanning && (
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            disabled={scanning}
            onClick={() => runScan(false)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple font-display font-bold text-primary-foreground neon-glow hover:scale-[1.02] transition-transform inline-flex items-center gap-2 disabled:opacity-60"
          >
            {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Radar className="h-4 w-4" />}
            {scanning ? "Analyzing…" : "Run Scan"}
          </button>
          <button
            disabled={scanning}
            onClick={() => runScan(true)}
            className="px-6 py-3 rounded-lg glass font-display font-bold hover:border-neon-purple/60 transition-all inline-flex items-center gap-2 disabled:opacity-60"
          >
            <Play className="h-4 w-4" /> Demo: Fake Detected
          </button>
        </div>
      </div>

      {verdict && (
        <div className={`glass-strong rounded-2xl p-6 animate-fade-up border ${verdict.label === "FAKE" ? "border-destructive/60" : "border-success/50"}`}>
          <div className="flex items-center gap-4">
            <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${verdict.label === "FAKE" ? "bg-destructive/20 text-destructive animate-pulse" : "bg-success/20 text-success"}`}>
              {verdict.label === "FAKE" ? <ShieldAlert className="h-7 w-7" /> : <ShieldCheck className="h-7 w-7" />}
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Verdict</div>
              <div className={`font-display text-3xl font-bold ${verdict.label === "FAKE" ? "text-destructive" : "text-success"}`}>
                {verdict.label}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Confidence</div>
              <div className="font-display text-3xl font-bold neon-text">{verdict.score.toFixed(1)}%</div>
            </div>
          </div>
          {verdict.label === "FAKE" && (
            <div className="mt-4 pt-4 border-t border-border/40 text-sm">
              <span className="text-muted-foreground">Likely generator: </span>
              <span className="font-mono text-neon-cyan">{verdict.model}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
