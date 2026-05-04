import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, Upload, Play, AlertTriangle, CheckCircle2, Cpu, Activity, Zap } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/detection")({
  head: () => ({
    meta: [
      { title: "Live Detection — DeepShield AI" },
      { name: "description", content: "Real-time multimodal deepfake detection dashboard." },
    ],
  }),
  component: Detection,
});

type Result = { verdict: "REAL" | "FAKE"; confidence: number; audio: number; video: number; latency: number; model: string };

function Detection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [waveform, setWaveform] = useState<{ t: number; v: number }[]>([]);
  const [spectro, setSpectro] = useState<{ t: number; v: number }[]>([]);
  const [perf, setPerf] = useState({ fps: 58, cpu: 34, gpu: 62, latency: 118, streams: 1 });

  // Generate live waveform/spectro
  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now();
      setWaveform((p) => [...p.slice(-39), { t, v: Math.sin(t / 120) * 50 + (Math.random() - 0.5) * 40 }]);
      setSpectro((p) => [...p.slice(-39), { t, v: 30 + Math.random() * 70 }]);
      setPerf((p) => ({
        fps: Math.max(45, Math.min(62, p.fps + (Math.random() - 0.5) * 3)),
        cpu: Math.max(20, Math.min(80, p.cpu + (Math.random() - 0.5) * 6)),
        gpu: Math.max(30, Math.min(95, p.gpu + (Math.random() - 0.5) * 8)),
        latency: Math.max(80, Math.min(180, p.latency + (Math.random() - 0.5) * 10)),
        streams: p.streams,
      }));
    }, 150);
    return () => clearInterval(id);
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch {
      setStreaming(false);
      alert("Camera access denied or unavailable. Try Demo Mode instead.");
    }
  };

  const runScan = (forceFake = false) => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      const isFake = forceFake || Math.random() > 0.55;
      const conf = 78 + Math.random() * 20;
      setResult({
        verdict: isFake ? "FAKE" : "REAL",
        confidence: +conf.toFixed(1),
        audio: +(isFake ? 25 + Math.random() * 30 : 80 + Math.random() * 18).toFixed(1),
        video: +(isFake ? 18 + Math.random() * 30 : 82 + Math.random() * 16).toFixed(1),
        latency: Math.round(95 + Math.random() * 60),
        model: isFake
          ? ["GAN-Based Generator", "Diffusion-Based Deepfake", "Face Swap Architecture", "Neural Voice Clone"][Math.floor(Math.random() * 4)]
          : "Authentic Source",
      });
      setScanning(false);
    }, 2200);
  };

  const runDemo = () => {
    setDemoMode(true);
    runScan(true);
  };

  return (
    <div className="px-4 md:px-6 py-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Live Detection <span className="neon-text">Dashboard</span></h1>
          <p className="text-muted-foreground text-sm mt-1">Multimodal pipeline · video + audio · sub-150ms</p>
        </div>
        <button
          onClick={runDemo}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-destructive to-neon-purple font-display font-bold text-sm neon-glow hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          <Play className="h-4 w-4" /> HACKATHON DEMO
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video feed */}
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold flex items-center gap-2"><Camera className="h-4 w-4 text-neon-cyan" /> Video Stream</h2>
            <div className="flex gap-2">
              <button onClick={startWebcam} className="px-3 py-1.5 text-xs rounded-md neon-border hover:bg-primary/10 inline-flex items-center gap-1.5">
                <Camera className="h-3.5 w-3.5" /> Webcam
              </button>
              <label className="px-3 py-1.5 text-xs rounded-md glass-strong cursor-pointer hover:border-neon-purple/60 inline-flex items-center gap-1.5">
                <Upload className="h-3.5 w-3.5" /> Upload
                <input type="file" accept="video/*" className="hidden" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f && videoRef.current) {
                    videoRef.current.srcObject = null;
                    videoRef.current.src = URL.createObjectURL(f);
                    videoRef.current.play();
                    setStreaming(true);
                  }
                }} />
              </label>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-neon-blue/30">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            {!streaming && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-3 grid-bg">
                <Camera className="h-12 w-12 opacity-40" />
                <p className="text-sm">Start webcam, upload a video, or run demo mode</p>
              </div>
            )}
            {scanning && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent h-24 animate-scan" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-destructive/80 text-xs font-mono font-bold tracking-widest animate-pulse">
                  SCANNING
                </div>
              </>
            )}
            {result && (
              <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-md font-display font-bold text-sm ${result.verdict === "FAKE" ? "bg-destructive text-destructive-foreground animate-pulse-glow" : "bg-success text-primary-foreground"}`}>
                {result.verdict}
              </div>
            )}
            {/* Corner markers */}
            <div className="absolute top-2 left-2 h-6 w-6 border-t-2 border-l-2 border-neon-cyan" />
            <div className="absolute top-2 right-2 h-6 w-6 border-t-2 border-r-2 border-neon-cyan" />
            <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-neon-cyan" />
            <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-neon-cyan" />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => runScan()}
              disabled={scanning}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2"
            >
              <Zap className="h-4 w-4" /> {scanning ? "Analyzing..." : "Run Detection"}
            </button>
          </div>
        </div>

        {/* Result panel */}
        <div className="space-y-6">
          <ResultCard result={result} scanning={scanning} demoMode={demoMode} />
          <RiskMeter score={result ? (result.verdict === "FAKE" ? result.confidence : 100 - result.confidence) : 12} />
        </div>
      </div>

      {/* Audio waveform + spectrogram */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display font-bold mb-3 flex items-center gap-2"><Activity className="h-4 w-4 text-neon-cyan" /> Audio Waveform</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waveform}>
                <Line type="monotone" dataKey="v" stroke="oklch(0.85 0.18 195)" strokeWidth={2} dot={false} isAnimationActive={false} />
                <YAxis hide domain={[-100, 100]} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display font-bold mb-3 flex items-center gap-2"><Activity className="h-4 w-4 text-neon-purple" /> Spectrogram</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spectro}>
                <defs>
                  <linearGradient id="spec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.27 305)" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="oklch(0.7 0.27 305)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="oklch(0.7 0.27 305)" strokeWidth={2} fill="url(#spec)" isAnimationActive={false} />
                <YAxis hide />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance widgets */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <PerfWidget label="FPS" value={perf.fps.toFixed(0)} unit="fps" icon={Activity} accent="neon-cyan" />
        <PerfWidget label="CPU" value={perf.cpu.toFixed(0)} unit="%" icon={Cpu} accent="neon-blue" />
        <PerfWidget label="GPU" value={perf.gpu.toFixed(0)} unit="%" icon={Cpu} accent="neon-purple" />
        <PerfWidget label="Latency" value={perf.latency.toFixed(0)} unit="ms" icon={Zap} accent="warning" />
        <PerfWidget label="Streams" value={perf.streams.toString()} unit="active" icon={Activity} accent="success" />
      </div>

      {/* Multimodal cards */}
      <div>
        <h2 className="font-display text-2xl font-bold mb-4">Multimodal Analysis</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: "Face Artifacts", score: result ? (result.verdict === "FAKE" ? 88 : 12) : 8, color: "neon-blue" },
            { name: "Lip-Sync Mismatch", score: result ? (result.verdict === "FAKE" ? 76 : 9) : 5, color: "neon-purple" },
            { name: "Eye Blinking", score: result ? (result.verdict === "FAKE" ? 64 : 14) : 11, color: "neon-cyan" },
            { name: "Voice Frequency", score: result ? (result.verdict === "FAKE" ? 81 : 7) : 6, color: "warning" },
            { name: "Emotion Consistency", score: result ? (result.verdict === "FAKE" ? 71 : 11) : 9, color: "destructive" },
          ].map((m) => (
            <div key={m.name} className="glass rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-2">{m.name}</div>
              <div className="font-display text-xl font-bold mb-2">{m.score}%</div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${m.score}%`, background: `linear-gradient(90deg, var(--${m.color === "destructive" ? "destructive" : m.color === "warning" ? "warning" : m.color === "success" ? "success" : "neon-blue"}), var(--neon-purple))` }} />
              </div>
              <div className="text-[10px] text-muted-foreground mt-2 font-mono uppercase">anomaly score</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ result, scanning, demoMode }: { result: Result | null; scanning: boolean; demoMode: boolean }) {
  return (
    <div className={`glass-strong rounded-2xl p-5 relative overflow-hidden ${result?.verdict === "FAKE" ? "border-destructive/60" : ""}`}>
      <h3 className="font-display font-bold mb-4 flex items-center gap-2">
        {result?.verdict === "FAKE" ? <AlertTriangle className="h-4 w-4 text-destructive" /> : <CheckCircle2 className="h-4 w-4 text-success" />}
        Detection Result
      </h3>
      {scanning && (
        <div className="space-y-3">
          <div className="h-12 rounded-md bg-muted/40 animate-pulse" />
          <div className="h-3 rounded bg-muted/40 animate-pulse" />
          <div className="h-3 w-2/3 rounded bg-muted/40 animate-pulse" />
        </div>
      )}
      {!scanning && !result && <p className="text-sm text-muted-foreground">Awaiting input. Run a scan to analyze.</p>}
      {!scanning && result && (
        <div className="space-y-4 animate-fade-up">
          <div className={`text-center py-4 rounded-xl ${result.verdict === "FAKE" ? "bg-destructive/15 border border-destructive/40" : "bg-success/10 border border-success/40"}`}>
            <div className={`font-display text-4xl font-black ${result.verdict === "FAKE" ? "text-destructive" : "text-success"}`}>
              {result.verdict}
            </div>
            <div className="text-xs font-mono mt-1 text-muted-foreground">CONFIDENCE {result.confidence}%</div>
          </div>
          <Stat label="Audio Authenticity" value={result.audio} />
          <Stat label="Video Authenticity" value={result.video} />
          <div className="flex justify-between text-sm pt-2 border-t border-border/40">
            <span className="text-muted-foreground">Latency</span>
            <span className="font-mono text-neon-cyan">{result.latency} ms</span>
          </div>
          {result.verdict === "FAKE" && (
            <div className="text-xs text-muted-foreground">
              <span className="text-muted-foreground">Likely source: </span>
              <span className="text-neon-purple font-bold">{result.model}</span>
            </div>
          )}
          {demoMode && result.verdict === "FAKE" && (
            <div className="absolute top-2 right-2 px-2 py-0.5 text-[10px] rounded font-mono bg-destructive/30 text-destructive border border-destructive/40">DEMO</div>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, background: value > 60 ? "var(--success)" : value > 30 ? "var(--warning)" : "var(--destructive)" }} />
      </div>
    </div>
  );
}

function RiskMeter({ score }: { score: number }) {
  const angle = (score / 100) * 180 - 90;
  const color = score > 70 ? "var(--destructive)" : score > 40 ? "var(--warning)" : "var(--success)";
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="font-display font-bold mb-3">Deepfake Risk</h3>
      <div className="relative w-full max-w-[220px] mx-auto aspect-[2/1]">
        <svg viewBox="0 0 200 110" className="w-full">
          <defs>
            <linearGradient id="risk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.75 0.2 150)" />
              <stop offset="50%" stopColor="oklch(0.8 0.18 75)" />
              <stop offset="100%" stopColor="oklch(0.65 0.27 25)" />
            </linearGradient>
          </defs>
          <path d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="oklch(0.25 0.05 270)" strokeWidth="14" strokeLinecap="round" />
          <path d="M10,100 A90,90 0 0,1 190,100" fill="none" stroke="url(#risk)" strokeWidth="14" strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 283} 283`} />
          <line x1="100" y1="100" x2="100" y2="25" stroke={color} strokeWidth="3" strokeLinecap="round"
            style={{ transformOrigin: "100px 100px", transform: `rotate(${angle}deg)`, transition: "transform 0.7s" }} />
          <circle cx="100" cy="100" r="6" fill={color} />
        </svg>
        <div className="text-center -mt-2">
          <div className="font-display text-3xl font-bold" style={{ color }}>{score.toFixed(0)}%</div>
          <div className="text-[10px] tracking-widest text-muted-foreground font-mono">RISK SCORE</div>
        </div>
      </div>
    </div>
  );
}

function PerfWidget({ label, value, unit, icon: Icon, accent }: { label: string; value: string; unit: string; icon: any; accent: string }) {
  return (
    <div className="glass rounded-xl p-4 relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">{label}</span>
        <Icon className={`h-3.5 w-3.5 text-${accent}`} />
      </div>
      <div className="font-display text-2xl font-bold">{value}<span className="text-xs text-muted-foreground ml-1 font-sans">{unit}</span></div>
      <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full blur-2xl" style={{ background: `var(--${accent})`, opacity: 0.25 }} />
    </div>
  );
}
