interface DotBackgroundProps {
  dotSize?: number;
  dotColor?: string;
  backgroundColor?: string;
  gap?: number;
  className?: string;
  maskClassName?: string;
  fade?: boolean;
}

export function DotBackground({
  dotSize = 1,
  dotColor = "rgba(255, 255, 255, 0.15)",
  backgroundColor = "transparent",
  gap = 25,
  className = "",
  maskClassName = "",
  fade = true,
}: DotBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundColor,
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        filter: "blur(0.3px)", // Subtle blur for smoothness
      }}
    >
      {fade && (
        <>
          {/* Very subtle gradient fade */}
          <div
            className={`absolute inset-0 ${maskClassName}`}
            style={{
              background: `linear-gradient(to bottom, 
                rgba(0, 0, 0, 0) 0%, 
                rgba(0, 0, 0, 0) 50%, 
                rgba(0, 0, 0, 0.1) 75%,
                rgba(0, 0, 0, 0.25) 90%,
                rgba(0, 0, 0, 0.4) 100%
              )`,
            }}
          />
          {/* Very subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.08) 100%)`,
            }}
          />
        </>
      )}
    </div>
  );
}
