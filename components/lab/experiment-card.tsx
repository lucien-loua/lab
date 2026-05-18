import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Experiment } from "@/lib/experiments";

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const date = new Date(experiment.date);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

  return (
    <Link
      href={`/lab/${experiment.slug}`}
      className="group flex items-baseline gap-4 rounded-md px-3 py-3 transition-colors hover:bg-muted/60 focus-visible:bg-muted focus-visible:outline-none"
    >
      <span className="min-w-20 font-mono text-xs text-muted-foreground">
        {dateLabel}
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          {experiment.title}
          <ArrowUpRight
            className="size-3.5 -translate-y-px text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1"
            weight="bold"
          />
        </span>
        <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">
          {experiment.summary}
        </span>
      </span>
      {experiment.status === "draft" ? (
        <span className="rounded border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          draft
        </span>
      ) : null}
    </Link>
  );
}
