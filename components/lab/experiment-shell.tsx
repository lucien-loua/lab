import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Experiment } from "@/lib/experiments";

export function BackLink({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-3.5" weight="bold" /> back
    </Link>
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
        <h1 className="text-xl font-medium tracking-tight">
          {experiment.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={experiment.date} className="font-mono">
            {dateLabel}
          </time>
          {experiment.tags.length > 0 ? (
            <span className="flex flex-wrap gap-1.5">
              {experiment.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]"
                >
                  {t}
                </span>
              ))}
            </span>
          ) : null}
        </div>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">
          {experiment.summary}
        </p>
      </header>
      <section>{children}</section>
    </main>
  );
}
