import { ExperimentCard } from "@/components/lab/experiment-card";
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
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="mb-12 sm:mb-16">
        <h1 className="font-medium font-mono text-lg tracking-tight">lab</h1>
        <p className="mt-2 max-w-prose text-muted-foreground text-sm">
          A sketchbook for UI experiments by{" "}
          <a
            className="underline underline-offset-4 hover:text-foreground"
            href="https://github.com/lucien-loua"
          >
            Lucien Loua
          </a>
          . Micro-interactions, animations, view transitions.
        </p>
      </header>

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
