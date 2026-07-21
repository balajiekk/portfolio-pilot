interface BrandMarkProps {
  className?: string;
}

/**
 * Paper-plane-on-an-uptrend mark: "Pilot" (navigation) over rising markets.
 * Renders as a full-bleed SVG so the parent's fixed-size, overflow-hidden
 * box (see .brand-lockup__mark / .topbar-brand__mark) clips it cleanly at
 * any size without the crop offsets a raster logo would need.
 */
export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brand-mark-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--wealth-sidebar-active)" />
          <stop offset="1" stopColor="var(--wealth-brand-mark-bg)" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="16" fill="url(#brand-mark-bg)" />

      <path
        d="M13 42 L23 33 L31 38 L49 17"
        fill="none"
        stroke="var(--wealth-gold)"
        strokeOpacity="0.5"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path d="M50 13 L25 27 L37 24 Z" fill="var(--wealth-gold)" />
      <path d="M50 13 L37 24 L38.5 35 Z" fill="var(--wealth-gold-dark)" />
      <circle cx="50" cy="13" r="2.1" fill="var(--wealth-gold)" />
    </svg>
  );
}
