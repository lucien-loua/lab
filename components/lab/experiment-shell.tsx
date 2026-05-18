import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Experiment } from "@/lib/experiments";

export function BackLink({ href = "/" }: { href?: string }) {
  return (
    <Button render={<Link href={href} />} size="sm" variant="ghost">
      <ArrowLeftIcon data-icon="inline-start" />
      back
    </Button>
  );
}

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
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
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
