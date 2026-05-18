import type { ComponentType } from "react";

export type ExperimentStatus = "draft" | "shipped";

export interface ExperimentMetadata {
  date: string;
  status: ExperimentStatus;
  summary: string;
  tags: string[];
  title: string;
}

export interface RegistryEntry extends ExperimentMetadata {
  Component: ComponentType;
}

// Add a new experiment here. See README for the full guide.
//
// Example:
//   import dynamic from "next/dynamic";
//   "hello-world": {
//     title: "Hello world",
//     date: "2026-05-18",
//     tags: ["starter"],
//     status: "draft",
//     summary: "A minimal first experiment.",
//     Component: dynamic(() => import("./hello-world/experiment")),
//   },
export const REGISTRY: Record<string, RegistryEntry> = {};
