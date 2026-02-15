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
  dotColor = "rgba(234, 234, 234, 0.15)", // Softer white for less harsh contrast
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
        WebkitMaskImage: fade
          ? "radial-gradient(ellipse at center, black 40%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)"
          : "none",
        maskImage: fade
          ? "radial-gradient(ellipse at center, black 40%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)"
          : "none",
        WebkitMaskComposite: fade ? "source-in" : "none",
        maskComposite: fade ? "intersect" : "none",
      }}
    />
  );
}
