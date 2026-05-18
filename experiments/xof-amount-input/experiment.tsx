"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const groupFormatter = new Intl.NumberFormat("fr-SN", {
  maximumFractionDigits: 0,
  useGrouping: true,
});

const currencyFormatter = new Intl.NumberFormat("fr-SN", {
  style: "currency",
  currency: "XOF",
  maximumFractionDigits: 0,
});

function digitsOnly(s: string) {
  return s.replace(/[^0-9]/g, "");
}

export default function XofAmountInputExperiment() {
  const reduce = useReducedMotion();
  const [raw, setRaw] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const numeric = useMemo(() => (raw === "" ? null : Number(raw)), [raw]);
  const formatted = useMemo(
    () => (numeric === null ? "" : groupFormatter.format(numeric)),
    [numeric]
  );

  useEffect(
    () => () => {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
    },
    []
  );

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = digitsOnly(e.target.value);
    setRaw(next);
    setError(false);
    setSuccess(false);
    setTyping(true);
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    typingTimer.current = setTimeout(() => setTyping(false), 250);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (numeric === null || numeric <= 0) {
      setError(true);
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 900);
  }

  const digitCount = raw.length;

  let activeAnimate: Record<string, number | number[]> | undefined;
  if (reduce) {
    activeAnimate = undefined;
  } else if (error) {
    activeAnimate = { x: [0, -6, 6, -4, 4, 0] };
  } else if (success) {
    activeAnimate = { scale: [1, 1.02, 1] };
  } else {
    activeAnimate = { x: 0, scale: 1 };
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Label className="text-muted-foreground text-xs" htmlFor="xof-amount">
        Amount
      </Label>

      <motion.div
        animate={activeAnimate}
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-card px-2 py-1 transition-colors",
          error && "border-destructive",
          success && "border-emerald-500"
        )}
        transition={{ duration: 0.4 }}
      >
        <Input
          aria-describedby="xof-help"
          aria-invalid={error}
          autoComplete="off"
          className="border-0 bg-transparent text-2xl tabular-nums shadow-none focus-visible:ring-0"
          id="xof-amount"
          inputMode="numeric"
          onChange={onChange}
          placeholder="0"
          value={formatted}
        />

        <AnimatePresence>
          {!typing && raw !== "" ? (
            <motion.span
              animate={{ opacity: 1, x: 0 }}
              className="pr-2 font-mono text-muted-foreground text-sm"
              exit={reduce ? undefined : { opacity: 0, x: 4 }}
              initial={reduce ? false : { opacity: 0, x: 4 }}
              key="currency"
              transition={{ duration: 0.2 }}
            >
              FCFA
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <div
        className="flex items-center justify-between text-muted-foreground text-xs"
        id="xof-help"
      >
        <span>
          {digitCount} {digitCount === 1 ? "digit" : "digits"}
        </span>
        <span aria-live="polite">
          {numeric === null ? "" : currencyFormatter.format(numeric)}
        </span>
      </div>

      <Button className="self-start" type="submit">
        Submit
      </Button>
    </form>
  );
}
