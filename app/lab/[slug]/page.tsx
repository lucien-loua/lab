import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import {
  experimentSlugs,
  getExperiment,
  type Experiment,
} from "@/lib/experiments";
import { ExperimentShell } from "@/components/lab/experiment-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return experimentSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const exp = await getExperiment(slug);
  if (!exp) return {};
  return { title: `${exp.title} — lab`, description: exp.summary };
}

const SpringToggle = dynamic(
  () => import("@/experiments/spring-toggle/experiment"),
);
const PhotoGrid = dynamic(
  () => import("@/experiments/photo-grid-transition/experiment"),
);
const XofInput = dynamic(
  () => import("@/experiments/xof-amount-input/experiment"),
);

const REGISTRY: Record<string, React.ComponentType> = {
  "spring-toggle": SpringToggle,
  "photo-grid-transition": PhotoGrid,
  "xof-amount-input": XofInput,
};

export default async function ExperimentPage({ params }: Props) {
  const { slug } = await params;
  const experiment: Experiment | null = await getExperiment(slug);
  if (!experiment) notFound();

  const Component = REGISTRY[slug];
  if (!Component) notFound();

  return (
    <ExperimentShell experiment={experiment}>
      <Component />
    </ExperimentShell>
  );
}
