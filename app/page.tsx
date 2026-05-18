import { getAllExperiments } from "@/lib/experiments";
import { ExperimentCard } from "@/components/lab/experiment-card";

export default async function HomePage() {
  const experiments = await getAllExperiments();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="mb-12 sm:mb-16">
        <h1 className="font-mono text-lg font-medium tracking-tight">lab</h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
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

      <section aria-label="Experiments" className="flex flex-col gap-2">
        {experiments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No experiments yet.</p>
        ) : (
          experiments.map((exp) => (
            <ExperimentCard key={exp.slug} experiment={exp} />
          ))
        )}
      </section>
    </main>
  );
}
