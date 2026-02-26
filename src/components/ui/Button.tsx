import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-secondary text-obsidian hover:shadow-[0_0_20px_var(--color-brand-dim)] active:scale-95",
        secondary:
          "bg-obsidian-muted border border-border-dim text-silk-white hover:bg-obsidian-surface backdrop-blur-md active:scale-95",
        outline:
          "border-2 border-secondary text-secondary hover:bg-secondary hover:text-obsidian active:scale-95",
        ghost:
          "hover:bg-silk-white/5 text-silk-white/60 hover:text-silk-white active:scale-95",
        link: "text-secondary underline-offset-4 hover:underline",
        shimmer:
          "animate-shimmer bg-gradient-to-r from-[var(--color-primary)] via-silk-white/20 to-[var(--color-primary)] bg-[length:200%_100%] text-silk-white border border-border-dim",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
