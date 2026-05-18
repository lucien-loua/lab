"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="icon-sm"
      variant="ghost"
    >
      {isDark ? <SunIcon weight="duotone" /> : <MoonIcon weight="duotone" />}
    </Button>
  );
}
