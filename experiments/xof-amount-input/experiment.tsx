"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
    [numeric],
  );

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = digitsOnly(e.target.value);
    setRaw(next);
    setError(false);
    setSuccess(false);
    setTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
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

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label
        htmlFor="xof-amount"
        className="text-xs font-medium text-muted-foreground"
      >
        Amount
      </label>

      <motion.div
        animate={
          reduce
            ? undefined
            : error
              ? { x: [0, -6, 6, -4, 4, 0] }
              : success
                ? { scale: [1, 1.02, 1] }
                : { x: 0, scale: 1 }
        }
        transition={{ duration: 0.4 }}
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-card px-4 py-3 transition-colors",
          error && "border-destructive",
          success && "border-emerald-500",
        )}
      >
        <input
          id="xof-amount"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={formatted}
          onChange={onChange}
          aria-invalid={error}
          aria-describedby="xof-help"
          className="flex-1 bg-transparent text-2xl tabular-nums outline-none placeholder:text-muted-foreground/60"
        />

        <AnimatePresence>
          {!typing && raw !== "" ? (
            <motion.span
              key="currency"
              initial={reduce ? false : { opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: 4 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-sm text-muted-foreground"
            >
              FCFA
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <div
        id="xof-help"
        className="flex items-center justify-between text-xs text-muted-foreground"
      >
        <span>
          {digitCount} {digitCount === 1 ? "digit" : "digits"}
        </span>
        <span aria-live="polite">
          {numeric !== null ? currencyFormatter.format(numeric) : ""}
        </span>
      </div>

      <button
        type="submit"
        className="self-start rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
}
