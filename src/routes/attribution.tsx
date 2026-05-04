import { createFileRoute } from "@tanstack/react-router";
import { Fingerprint } from "lucide-react";

export const Route = createFileRoute("/attribution")({
  head: () => ({
    meta: [
      { title: "AI Model Attribution — DeepShield AI" },
      { name: "description", content: "Identify the likely AI generator family behind a deepfake." },
    ],
  }),
  component: Attribution,
});

const families = [
  { name: "GAN-Based Generator", desc: "StyleGAN, ProGAN-class architectures with periodic frequency artifacts.", confidence: 92, tags: ["StyleGAN3", "PGGAN"] },
  { name: "Diffusion-Based Deepfake", desc: "Latent diffusion fingerprints; smooth temporal coherence with subtle noise.", confidence: 78, tags: ["SD-Video", "AnimateDiff"] },
  { name: "Face Swap Architecture", desc: "Encoder-decoder identity transfer; boundary blending artifacts at jawline.", confidence: 64, tags: ["DeepFaceLab", "FaceShifter"] },
  { name: "Neural Voice Clone", desc: "TTS-synthesized prosody with mel-spectrum quantization signatures.", confidence: 71, tags: ["VALL-E", "XTTS"] },
];

function Attribution() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl glass-strong flex items-center justify-center neon-glow">
          <Fingerprint className="h-6 w-6 text-neon-cyan" />
        </div>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">AI Model <span className="neon-text">Attribution</span></h1>
          <p className="text-muted-foreground text-sm mt-1">Trace synthetic content back to its likely generator family.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {families.map((f, i) => (
          <div key={f.name} className="glass rounded-2xl p-6 hover:border-neon-purple/50 transition-all animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-display font-bold text-lg">{f.name}</h3>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-primary/15 border border-primary/30 text-primary">{f.confidence}%</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{f.desc}</p>
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                <span className="text-muted-foreground">Match Confidence</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple transition-all duration-1000" style={{ width: `${f.confidence}%` }} />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {f.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full glass font-mono text-neon-cyan border border-neon-cyan/20">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-strong rounded-2xl p-6">
        <h2 className="font-display font-bold text-lg mb-3">How attribution works</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          DeepShield's attribution engine extracts spectral and spatial fingerprints unique to each generator family — periodic frequency peaks for GANs, latent denoising signatures for diffusion models, and boundary inconsistencies for face-swap pipelines. A multi-class classifier ranks the likelihood of each family in real time.
        </p>
      </div>
    </div>
  );
}
