import type { ExperimentMetadata } from "@/lib/experiments";

export const metadata: ExperimentMetadata = {
  title: "Photo grid transition",
  date: "2026-05-16",
  tags: ["view-transitions", "next", "navigation"],
  status: "shipped",
  summary:
    "A 3x3 grid where each card morphs into a hero on tap via the View Transitions API.",
};
