import React from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  gridColor?: string;
  backgroundColor?: string;
  fade?: boolean;
  maskClassName?: string;
}

export const GridBackground = ({
  children,
  className = "",
  gridSize = 50,
  gridColor = "rgba(234, 234, 234, 0.08)", // Softer white for less harsh contrast
  backgroundColor = "transparent",
  fade = true,
}: GridBackgroundProps) => {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundColor,
        backgroundImage: `
          linear-gradient(${gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        filter: "blur(0.4px)", // Subtle blur for smooth lines
        WebkitMaskImage: fade
          ? "radial-gradient(ellipse at center, black 40%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)"
          : "none",
        maskImage: fade
          ? "radial-gradient(ellipse at center, black 40%, transparent 100%), linear-gradient(to bottom, black 60%, transparent 100%)"
          : "none",
        WebkitMaskComposite: fade ? "source-in" : "none",
        maskComposite: fade ? "intersect" : "none",
      }}
    >
      {children}
    </div>
  );
};
