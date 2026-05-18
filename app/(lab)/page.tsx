import { ExperimentCard } from "@/components/lab/elements/experiment-card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ItemGroup } from "@/components/ui/item";
import { getAllExperiments } from "@/lib/experiments";

export default function HomePage() {
  const experiments = getAllExperiments();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <p className="mb-12 max-w-prose text-muted-foreground text-sm sm:mb-16">
        A sketchbook for UI experiments. Micro-interactions, animations, view
        transitions.
      </p>

      <section aria-label="Experiments">
        {experiments.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>No experiments yet</EmptyTitle>
              <EmptyDescription>
                Register one in experiments/registry.ts.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ItemGroup>
            {experiments.map((exp) => (
              <ExperimentCard experiment={exp} key={exp.slug} />
            ))}
          </ItemGroup>
        )}
      </section>
    </main>
  );
}
