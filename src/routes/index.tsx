import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedBg } from "@/components/AnimatedBg";
import { Radar, Zap, Shield, Activity, Brain, Eye } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeepShield AI — Real-Time Multimodal Deepfake Detection" },
      { name: "description", content: "Detect AI-generated faces and cloned voices instantly using multimodal AI analysis." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <AnimatedBg />
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl text-center space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-neon-cyan border border-neon-cyan/30">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
            MULTIMODAL AI · v1.0 · LIVE
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-tight">
            <span className="neon-text">Real-Time Multimodal</span>
            <br />
            <span className="text-foreground">Deepfake Detection</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Detect AI-generated faces and cloned voices instantly using multimodal AI analysis. Built for journalists, security teams, and digital defenders.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/detection" className="px-7 py-3.5 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple font-display font-bold text-primary-foreground neon-glow hover:scale-105 transition-transform inline-flex items-center gap-2">
              <Radar className="h-5 w-5" /> Try Live Detection
            </Link>
            <Link to="/about" className="px-7 py-3.5 rounded-lg glass-strong font-display font-bold hover:border-neon-blue/60 transition-all inline-flex items-center gap-2">
              <Shield className="h-5 w-5" /> Learn More
            </Link>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto">
            {[
              { v: "98.7%", l: "Accuracy" },
              { v: "<120ms", l: "Latency" },
              { v: "60 FPS", l: "Real-time" },
              { v: "12+", l: "AI Models ID'd" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-4">
                <div className="font-display text-2xl font-bold neon-text">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">
          Defense across <span className="neon-text">every signal</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">Six pillars of multimodal deepfake detection.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Eye, title: "Face Artifact Analysis", desc: "Detects pixel-level inconsistencies, GAN fingerprints, and frame-blending artifacts." },
            { icon: Activity, title: "Voice Frequency Forensics", desc: "Spectrogram analysis identifies cloned voices and synthetic prosody." },
            { icon: Brain, title: "AI Model Attribution", desc: "Identifies the likely generator family — GAN, diffusion, or face-swap." },
            { icon: Zap, title: "Sub-150ms Inference", desc: "Real-time pipeline optimized for consumer GPUs and CPU fallback." },
            { icon: Shield, title: "Live Stream Monitoring", desc: "Webcam, RTMP, and WebRTC sources analyzed continuously." },
            { icon: Radar, title: "Lip-Sync Mismatch", desc: "Cross-modal alignment between audio phonemes and mouth movement." },
          ].map((f, i) => (
            <div key={f.title} className="glass rounded-2xl p-6 hover:border-neon-blue/50 transition-all hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-neon-cyan" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
