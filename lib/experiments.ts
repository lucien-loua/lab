import { type ExperimentMetadata, REGISTRY } from "@/experiments/registry";

export type {
  ExperimentMetadata,
  ExperimentStatus,
} from "@/experiments/registry";

export interface Experiment extends ExperimentMetadata {
  slug: string;
}

export function getAllExperiments(): Experiment[] {
  return Object.entries(REGISTRY)
    .map(([slug, entry]) => ({
      slug,
      date: entry.date,
      status: entry.status,
      summary: entry.summary,
      tags: entry.tags,
      title: entry.title,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getExperiment(slug: string): Experiment | null {
  const entry = REGISTRY[slug];
  if (!entry) {
    return null;
  }
  return {
    slug,
    date: entry.date,
    status: entry.status,
    summary: entry.summary,
    tags: entry.tags,
    title: entry.title,
  };
}

export function experimentSlugs(): string[] {
  return Object.keys(REGISTRY);
}
