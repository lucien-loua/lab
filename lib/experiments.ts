import "server-only";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export type ExperimentStatus = "draft" | "shipped";

export interface ExperimentMetadata {
  date: string;
  status: ExperimentStatus;
  summary: string;
  tags: string[];
  title: string;
}

export type Experiment = ExperimentMetadata & {
  slug: string;
  hasNotes: boolean;
};

const ROOT = path.join(process.cwd(), "experiments");

function listSlugs(): string[] {
  if (!existsSync(ROOT)) {
    return [];
  }
  return readdirSync(ROOT).filter((name) => {
    const full = path.join(ROOT, name);
    return statSync(full).isDirectory();
  });
}

async function loadOne(slug: string): Promise<Experiment | null> {
  const dir = path.join(ROOT, slug);
  const metaFile = path.join(dir, "metadata.ts");
  if (!existsSync(metaFile)) {
    return null;
  }
  const mod: { metadata: ExperimentMetadata } = await import(
    `../experiments/${slug}/metadata.ts`
  );
  const hasNotes = existsSync(path.join(dir, "notes.mdx"));
  return { slug, hasNotes, ...mod.metadata };
}

export async function getAllExperiments(): Promise<Experiment[]> {
  const slugs = listSlugs();
  const items = await Promise.all(slugs.map(loadOne));
  return items
    .filter((x): x is Experiment => x !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getExperiment(slug: string): Promise<Experiment | null> {
  return loadOne(slug);
}

export function experimentSlugs(): string[] {
  return listSlugs();
}
