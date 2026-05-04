import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Video, Mic, Cpu, GitMerge, ShieldAlert, Fingerprint, Film } from "lucide-react";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "System Architecture — DeepShield AI" },
      { name: "description", content: "End-to-end multimodal deepfake detection pipeline." },
    ],
  }),
  component: Architecture,
});

const stages = [
  { icon: Video, title: "Video Stream", desc: "Webcam · RTMP · WebRTC ingest" },
  { icon: Film, title: "Frame Extraction", desc: "30–60 FPS face crops" },
  { icon: Mic, title: "Audio Extraction", desc: "16kHz PCM + mel-spec" },
  { icon: Cpu, title: "Dual AI Models", desc: "Video CNN + Audio Transformer" },
  { icon: GitMerge, title: "Fusion Engine", desc: "Cross-modal attention" },
  { icon: ShieldAlert, title: "Deepfake Detection", desc: "Real / Fake verdict + score" },
  { icon: Fingerprint, title: "Attribution Engine", desc: "Generator family classifier" },
];

function Architecture() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">System <span className="neon-text">Architecture</span></h1>
        <p className="text-muted-foreground text-sm mt-1">End-to-end multimodal pipeline.</p>
      </div>

      <div className="glass-strong rounded-2xl p-8 overflow-x-auto">
        <div className="flex flex-col lg:flex-row items-stretch gap-3 min-w-fit">
          {stages.map((s, i) => (
            <div key={s.title} className="flex flex-col lg:flex-row items-center gap-3 flex-1 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="glass rounded-xl p-4 w-full text-center hover:border-neon-blue/60 hover:neon-glow transition-all">
                <div className="h-10 w-10 mx-auto rounded-lg bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 flex items-center justify-center mb-2 border border-neon-blue/40">
                  <s.icon className="h-5 w-5 text-neon-cyan" />
                </div>
                <div className="font-display font-bold text-sm">{s.title}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.desc}</div>
              </div>
              {i < stages.length - 1 && (
                <ArrowRight className="hidden lg:block h-5 w-5 text-neon-purple shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          { t: "Edge Optimized", d: "Quantized models run on consumer GPUs and even CPU-only laptops." },
          { t: "Streaming Ready", d: "WebRTC pipeline supports continuous live feed analysis." },
          { t: "Modular Models", d: "Swap in new attribution heads as new generators emerge." },
        ].map((c) => (
          <div key={c.t} className="glass rounded-2xl p-5">
            <h3 className="font-display font-bold mb-2">{c.t}</h3>
            <p className="text-sm text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
