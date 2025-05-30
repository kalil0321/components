"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [, startTransition] = React.useTransition();

  return (
    <Button
      className={cn("h-7 w-7", className)}
      onClick={() => {
        startTransition(() => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        });
      }}
      size="icon"
      variant="ghost"
    >
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
