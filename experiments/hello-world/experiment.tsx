"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HelloWorldExperiment() {
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-start gap-6">
      <motion.span
        animate={{ y: 0, opacity: 1 }}
        className="font-mono text-4xl tabular-nums"
        initial={reduce ? false : { y: -8, opacity: 0 }}
        key={count}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        {count}
      </motion.span>
      <Button onClick={() => setCount((n) => n + 1)}>Increment</Button>
    </div>
  );
}
