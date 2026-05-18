"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            size="icon"
            variant="ghost"
          >
            {isDark ? (
              <SunIcon weight="duotone" />
            ) : (
              <MoonIcon weight="duotone" />
            )}
          </Button>
        }
      />
      <TooltipContent>
        Toggle theme <Kbd>d</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}
