import { notFound } from "next/navigation";
import { ExperimentShell } from "@/components/lab/experiment-shell";
import { REGISTRY } from "@/experiments/registry";
import { experimentSlugs, getExperiment } from "@/lib/experiments";

export const dynamicParams = false;

export function generateStaticParams() {
  return experimentSlugs().map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const exp = getExperiment(slug);
  if (!exp) {
    return {};
  }
  return { title: `${exp.title} — lab`, description: exp.summary };
}

export default async function ExperimentPage({ params }: Props) {
  const { slug } = await params;
  const entry = REGISTRY[slug];
  const experiment = getExperiment(slug);
  if (!entry) {
    notFound();
  }
  if (!experiment) {
    notFound();
  }

  const { Component } = entry;

  return (
    <ExperimentShell experiment={experiment}>
      <Component />
    </ExperimentShell>
  );
}
