export function AnimatedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 grid-bg animate-grid-move opacity-60" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-neon-blue/20 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-neon-purple/20 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-neon-cyan/15 blur-3xl animate-float-slow" style={{ animationDelay: "4s" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
