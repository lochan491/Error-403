import { createFileRoute } from "@tanstack/react-router";
import { Radar, Brain, Zap, Wifi, Fingerprint, Cpu } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — DeepShield AI" },
      { name: "description", content: "Real-time multimodal detection, attribution, and live streaming defense." },
    ],
  }),
  component: Features,
});

const features = [
  { icon: Radar, t: "Real-Time Detection", d: "Sub-150ms verdicts on live video streams without breaking a sweat." },
  { icon: Brain, t: "Multimodal AI Analysis", d: "Joint video and audio inference catches what single-modality detectors miss." },
  { icon: Zap, t: "Lightweight Inference", d: "Quantized + distilled models run on a single consumer GPU or CPU fallback." },
  { icon: Wifi, t: "Live Streaming Support", d: "Webcam, RTMP, and WebRTC ingest with rolling-window analysis." },
  { icon: Fingerprint, t: "Deepfake Attribution", d: "Identify the likely generator family — GAN, diffusion, face-swap, voice clone." },
  { icon: Cpu, t: "Consumer Hardware Optimized", d: "No data center required. Runs locally to preserve privacy." },
];

function Features() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Platform <span className="neon-text">Features</span></h1>
        <p className="text-muted-foreground text-sm mt-1">Everything you need to defend against synthetic media.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div key={f.t} className="glass rounded-2xl p-6 hover:border-neon-blue/60 hover:-translate-y-1 transition-all animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-neon-blue/25 to-neon-purple/25 border border-neon-blue/30 flex items-center justify-center mb-4">
              <f.icon className="h-6 w-6 text-neon-cyan" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{f.t}</h3>
            <p className="text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
