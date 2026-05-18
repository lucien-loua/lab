"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface Preset {
  config: { type: "spring"; stiffness: number; damping: number; mass: number };
  name: string;
}

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
    <Card size="sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-mono text-xs">{preset.name}</CardTitle>
        <motion.div layout transition={transition}>
          <Switch checked={on} onCheckedChange={setOn} />
        </motion.div>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded bg-muted/60 p-2 font-mono text-[10px] text-muted-foreground leading-tight">
          {`stiffness: ${preset.config.stiffness}
damping:   ${preset.config.damping}
mass:      ${preset.config.mass}`}
        </pre>
      </CardContent>
    </Card>
  );
}
