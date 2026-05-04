export function ShieldLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DeepShield AI">
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.18 195)" />
          <stop offset="50%" stopColor="oklch(0.7 0.22 260)" />
          <stop offset="100%" stopColor="oklch(0.65 0.25 305)" />
        </linearGradient>
      </defs>
      <path d="M24 3 L42 10 V24 C42 34 33 42 24 45 C15 42 6 34 6 24 V10 Z"
        fill="url(#shieldGrad)" opacity="0.18" stroke="url(#shieldGrad)" strokeWidth="1.5" />
      <path d="M24 11 L34 15 V24 C34 30 29 35 24 37 C19 35 14 30 14 24 V15 Z"
        fill="none" stroke="url(#shieldGrad)" strokeWidth="1.5" />
      <circle cx="24" cy="22" r="3" fill="url(#shieldGrad)" />
      <path d="M18 28 Q24 32 30 28" stroke="url(#shieldGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="22" r="6" fill="none" stroke="url(#shieldGrad)" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}
