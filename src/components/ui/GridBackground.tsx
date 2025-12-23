import React from "react";
import { cn } from "@/lib/utils";

export const GridBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("h-screen w-full dark:bg-bg-dark bg-white bg-grid-white relative flex items-center justify-center", className)}>
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-bg-dark bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};
