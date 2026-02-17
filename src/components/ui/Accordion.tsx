import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("space-y-4", className)}>{children}</div>;
};

const AccordionItem = ({
  title,
  children,
  className,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "border border-border-dim rounded-2xl bg-obsidian-muted overflow-hidden",
        className,
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-silk-white/5"
      >
        <div className="flex items-center gap-3">{title}</div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-accent" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8 pt-0">
              <div className="text-text-muted leading-relaxed pl-8 border-l border-border-dim">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Accordion, AccordionItem };
