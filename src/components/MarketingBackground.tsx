"use client";

/**
 * MarketingBackground: subtle grid, flowing curves, and animated tracking
 * dots (GPS blips moving between stations).
 *
 * When `height` is provided the background renders absolutely within its
 * nearest positioned ancestor (use inside a `position: relative` container).
 * Without `height` it renders fixed to cover the full viewport.
 */
export default function MarketingBackground({ height }: { height?: string }) {
  const positioned = height !== undefined;

  return (
    <>
      {/* Grid overlay */}
      <div
        style={{
          position: positioned ? "absolute" : "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: positioned ? undefined : 0,
          height: positioned ? height : undefined,
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Flowing light curves and animated tracking dots */}
      <svg
        style={{
          position: positioned ? "absolute" : "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: positioned ? height : "100%",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.4,
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mbg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mbg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="40%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mbg3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </linearGradient>

          {/* Floor-plan / terminal path for tracking visualization */}
          <path
            id="trackPath1"
            d="M100,600 L350,600 L350,450 L600,450 L600,600 L850,600 L850,400 L1100,400 L1100,550 L1340,550"
            fill="none"
          />
          <path
            id="trackPath2"
            d="M1340,700 L1100,700 L1100,500 L850,500 L850,700 L600,700 L600,500 L350,500 L350,650 L100,650"
            fill="none"
          />
          <path
            id="trackPath3"
            d="M100,750 L400,750 L400,550 L700,550 L700,750 L1000,750 L1000,500 L1340,500"
            fill="none"
          />

          {/* Glow filter for dots */}
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient flowing curves */}
        <path
          d="M0,300 C200,230 400,370 720,250 C1040,130 1240,330 1440,270"
          fill="none"
          stroke="url(#mbg1)"
          strokeWidth="1.5"
        />
        <path
          d="M0,450 C300,370 500,530 800,410 C1100,290 1300,450 1440,420"
          fill="none"
          stroke="url(#mbg2)"
          strokeWidth="1"
        />
        <path
          d="M0,550 C250,480 600,600 900,480 C1150,380 1350,520 1440,500"
          fill="none"
          stroke="url(#mbg3)"
          strokeWidth="0.8"
        />

        {/* Glow orbs for depth */}
        <circle cx="720" cy="200" r="200" fill="url(#mbg1)" opacity="0.04" />
        <circle cx="300" cy="500" r="150" fill="url(#mbg2)" opacity="0.03" />
        <circle cx="1100" cy="400" r="180" fill="url(#mbg3)" opacity="0.03" />

        {/* Terminal floor plan lines (subtle) */}
        <use href="#trackPath1" stroke="rgba(59,130,246,0.08)" strokeWidth="1" strokeDasharray="6 4" />
        <use href="#trackPath2" stroke="rgba(99,102,241,0.06)" strokeWidth="1" strokeDasharray="6 4" />
        <use href="#trackPath3" stroke="rgba(14,165,233,0.06)" strokeWidth="1" strokeDasharray="6 4" />

        {/* Station markers along the paths */}
        {[
          [100, 600], [350, 450], [600, 600], [850, 400], [1100, 550], [1340, 550],
          [1340, 700], [1100, 500], [850, 700], [600, 500], [350, 650], [100, 650],
        ].map(([cx, cy], i) => (
          <rect
            key={i}
            x={(cx as number) - 4}
            y={(cy as number) - 4}
            width="8"
            height="8"
            rx="2"
            fill="none"
            stroke="rgba(59,130,246,0.12)"
            strokeWidth="1"
          />
        ))}

        {/* Animated tracking dots: cleaners moving between stations */}
        <circle r="4" fill="#3b82f6" filter="url(#dotGlow)" opacity="0.8">
          <animateMotion dur="18s" repeatCount="indefinite">
            <mpath href="#trackPath1" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#8b5cf6" filter="url(#dotGlow)" opacity="0.7">
          <animateMotion dur="22s" repeatCount="indefinite">
            <mpath href="#trackPath2" />
          </animateMotion>
        </circle>
        <circle r="3.5" fill="#0ea5e9" filter="url(#dotGlow)" opacity="0.6">
          <animateMotion dur="25s" repeatCount="indefinite">
            <mpath href="#trackPath3" />
          </animateMotion>
        </circle>
        {/* Second set offset */}
        <circle r="3" fill="#60a5fa" filter="url(#dotGlow)" opacity="0.5">
          <animateMotion dur="18s" begin="9s" repeatCount="indefinite">
            <mpath href="#trackPath1" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dotGlow)" opacity="0.5">
          <animateMotion dur="22s" begin="11s" repeatCount="indefinite">
            <mpath href="#trackPath2" />
          </animateMotion>
        </circle>
      </svg>
    </>
  );
}
