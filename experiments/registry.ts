import dynamic from "next/dynamic";
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
export const REGISTRY: Record<string, RegistryEntry> = {
  "hello-world": {
    title: "Hello world",
    date: "2026-05-18",
    tags: ["motion", "starter"],
    status: "shipped",
    summary: "A counter that animates on increment. Canonical starter.",
    Component: dynamic(() => import("./hello-world/experiment")),
  },
};
