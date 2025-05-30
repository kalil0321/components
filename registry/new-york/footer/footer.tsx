"use client";

import { motion } from "motion/react";
import TextWithTooltip from "@/registry/new-york/text-with-tooltip/text-with-tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function PageFooter({ className }: { className?: string }) {
  const [currentYear, setCurrentYear] = useState(() =>
    new Date().getFullYear()
  );

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={cn("bg-background/80 backdrop-blur-sm", className)}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          className="flex flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="font-bold text-xl tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            kalil0321
          </motion.div>

          <motion.p
            className="text-sm text-muted-foreground text-center max-w-md hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <TextWithTooltip />
          </motion.p>

          <motion.div
            className="text-xs text-muted-foreground/70 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            suppressHydrationWarning
          >
            © {currentYear} Built with{" "}
            <motion.span
              className="inline-block text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              ♥
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
