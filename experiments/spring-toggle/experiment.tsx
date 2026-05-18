"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { Switch } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";

type Preset = {
  name: string;
  config: { type: "spring"; stiffness: number; damping: number; mass: number };
};

const PRESETS: Preset[] = [
  {
    name: "gentle",
    config: { type: "spring", stiffness: 120, damping: 18, mass: 1 },
  },
  {
    name: "snappy",
    config: { type: "spring", stiffness: 500, damping: 32, mass: 0.7 },
  },
  {
    name: "bouncy",
    config: { type: "spring", stiffness: 380, damping: 12, mass: 1 },
  },
];

export default function SpringToggleExperiment() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {PRESETS.map((preset) => (
        <PresetCard key={preset.name} preset={preset} />
      ))}
    </div>
  );
}

function PresetCard({ preset }: { preset: Preset }) {
  const [on, setOn] = useState(false);
  const reduce = useReducedMotion();
  const transition: Transition = reduce ? { duration: 0 } : preset.config;

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs">{preset.name}</span>
        <Switch.Root
          checked={on}
          onCheckedChange={setOn}
          className={cn(
            "relative inline-flex h-7 w-12 cursor-pointer items-center rounded-full border transition-colors",
            on ? "bg-foreground" : "bg-muted",
          )}
        >
          <motion.span
            layout
            transition={transition}
            className={cn(
              "absolute size-5 rounded-full bg-background shadow",
              on ? "right-1" : "left-1",
            )}
            whileTap={reduce ? undefined : { scale: 0.9 }}
          />
        </Switch.Root>
      </div>
      <pre className="overflow-x-auto rounded bg-muted/60 p-2 font-mono text-[10px] leading-tight text-muted-foreground">
        {`stiffness: ${preset.config.stiffness}
damping:   ${preset.config.damping}
mass:      ${preset.config.mass}`}
      </pre>
    </div>
  );
}
