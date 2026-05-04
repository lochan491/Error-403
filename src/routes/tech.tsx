import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tech")({
  head: () => ({
    meta: [
      { title: "Tech Stack — DeepShield AI" },
      { name: "description", content: "Frontend, backend, and ML stack powering DeepShield." },
    ],
  }),
  component: Tech,
});

const stack = [
  { n: "React", c: "Frontend", d: "TanStack Start · Tailwind · Recharts" },
  { n: "Python", c: "Backend", d: "FastAPI inference server" },
  { n: "TensorFlow / PyTorch", c: "ML Framework", d: "Model training and serving" },
  { n: "OpenCV", c: "Vision", d: "Frame extraction · face detection" },
  { n: "Librosa", c: "Audio", d: "Spectrogram + mel-feature extraction" },
  { n: "WebRTC", c: "Streaming", d: "Low-latency live video ingest" },
];

function Tech() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Tech <span className="neon-text">Stack</span></h1>
        <p className="text-muted-foreground text-sm mt-1">Built on proven open-source foundations.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stack.map((s, i) => (
          <div key={s.n} className="glass rounded-2xl p-6 hover:neon-border transition-all animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-neon-cyan mb-2">{s.c}</div>
            <h3 className="font-display font-bold text-2xl mb-2">{s.n}</h3>
            <p className="text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
