import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — DeepShield AI" },
      { name: "description", content: "Detection analytics, threat trends, and frame-level timeline." },
    ],
  }),
  component: Analytics,
});

const detections = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  real: 80 + Math.round(Math.random() * 60),
  fake: 20 + Math.round(Math.random() * 50),
}));
const sources = [
  { name: "GAN", value: 38, color: "oklch(0.75 0.2 240)" },
  { name: "Diffusion", value: 27, color: "oklch(0.7 0.27 305)" },
  { name: "Face Swap", value: 22, color: "oklch(0.85 0.18 195)" },
  { name: "Voice Clone", value: 13, color: "oklch(0.8 0.18 75)" },
];
const timeline = Array.from({ length: 30 }, (_, i) => ({ f: i + 1, score: 10 + Math.random() * 30 + (i > 18 ? Math.random() * 50 : 0) }));

function Analytics() {
  return (
    <div className="px-4 md:px-6 py-6 max-w-[1500px] mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Threat <span className="neon-text">Analytics</span></h1>
        <p className="text-muted-foreground text-sm mt-1">Aggregated detection telemetry across the DeepShield network.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { l: "Total Scans", v: "47,821" },
          { l: "Fakes Caught", v: "8,394" },
          { l: "Avg Confidence", v: "94.2%" },
          { l: "Avg Latency", v: "118 ms" },
        ].map((s) => (
          <div key={s.l} className="glass rounded-xl p-5">
            <div className="text-xs text-muted-foreground tracking-widest uppercase">{s.l}</div>
            <div className="font-display text-3xl font-bold neon-text mt-2">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <h3 className="font-display font-bold mb-4">Detections Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detections}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.15 270 / 0.15)" />
                <XAxis dataKey="m" stroke="oklch(0.7 0.04 260)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0.04 260)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.16 0.05 270)", border: "1px solid oklch(0.7 0.22 260 / 0.4)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="real" fill="oklch(0.75 0.2 150)" radius={[4,4,0,0]} />
                <Bar dataKey="fake" fill="oklch(0.65 0.27 25)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display font-bold mb-4">Generator Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sources} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {sources.map((s) => <Cell key={s.name} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.16 0.05 270)", border: "1px solid oklch(0.7 0.22 260 / 0.4)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h3 className="font-display font-bold mb-4">Frame Timeline · Anomaly Score</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.15 270 / 0.15)" />
              <XAxis dataKey="f" stroke="oklch(0.7 0.04 260)" fontSize={11} label={{ value: "Frame", fill: "oklch(0.7 0.04 260)", fontSize: 11, position: "insideBottom", offset: -2 }} />
              <YAxis stroke="oklch(0.7 0.04 260)" fontSize={11} />
              <Tooltip contentStyle={{ background: "oklch(0.16 0.05 270)", border: "1px solid oklch(0.7 0.22 260 / 0.4)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="score" stroke="oklch(0.7 0.27 305)" strokeWidth={2} dot={{ r: 3, fill: "oklch(0.85 0.18 195)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Spike at frame 19+ indicates synthetic content emergence.</p>
      </div>
    </div>
  );
}
