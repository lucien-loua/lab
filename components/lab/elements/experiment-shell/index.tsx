import { Badge } from "@/components/ui/badge";
import type { Experiment } from "@/lib/experiments";
import { BackLink } from "../back-link";

export function ExperimentShell({
  experiment,
  children,
}: {
  experiment: Experiment;
  children: React.ReactNode;
}) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(experiment.date));

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-4 pb-16 sm:px-6 sm:pt-8">
      <BackLink />
      <header className="mt-6 mb-10">
        <h1 className="font-medium text-xl tracking-tight">
          {experiment.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
          <time className="font-mono" dateTime={experiment.date}>
            {dateLabel}
          </time>
          {experiment.tags.length > 0 ? (
            <span className="flex flex-wrap gap-1.5">
              {experiment.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </span>
          ) : null}
        </div>
        <p className="mt-4 max-w-prose text-muted-foreground text-sm">
          {experiment.summary}
        </p>
      </header>
      <section>{children}</section>
    </main>
  );
}
