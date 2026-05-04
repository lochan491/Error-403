import { createFileRoute } from "@tanstack/react-router";
import { Target, Shield, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DeepShield AI" },
      { name: "description", content: "Our mission to protect digital identity through ethical AI." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">About <span className="neon-text">DeepShield</span></h1>
        <p className="text-muted-foreground mt-2">A real-time multimodal deepfake detection platform built for the post-synthetic-media era.</p>
      </div>

      <div className="glass-strong rounded-2xl p-8">
        <h2 className="font-display font-bold text-2xl mb-3">Project Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          DeepShield AI fuses video and audio signals to detect deepfakes in real time. Beyond a binary verdict, it identifies the likely generator family — empowering journalists, security teams, and platforms to respond with context.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="glass rounded-2xl p-6">
          <Target className="h-7 w-7 text-neon-cyan mb-3" />
          <h3 className="font-display font-bold mb-2">Mission</h3>
          <p className="text-sm text-muted-foreground">Make deepfake detection instant, transparent, and accessible to everyone — not just enterprises.</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <Shield className="h-7 w-7 text-neon-blue mb-3" />
          <h3 className="font-display font-bold mb-2">Cybersecurity Impact</h3>
          <p className="text-sm text-muted-foreground">Defend identities, elections, and brands from voice-cloning fraud and synthetic impersonation attacks.</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <Heart className="h-7 w-7 text-neon-purple mb-3" />
          <h3 className="font-display font-bold mb-2">Ethical AI</h3>
          <p className="text-sm text-muted-foreground">No biometric data leaves the device. Models are auditable. Detection always shows confidence and limitations.</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-sm text-muted-foreground italic">
          "Trust in what we see and hear is foundational. DeepShield exists so that trust survives the age of synthetic media."
        </p>
      </div>
    </div>
  );
}
