import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Experiment } from "@/lib/experiments";

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(experiment.date));

  return (
    <Link
      className="group flex items-baseline gap-4 rounded-md px-3 py-3 transition-colors hover:bg-muted/60 focus-visible:bg-muted focus-visible:outline-none"
      href={`/lab/${experiment.slug}`}
    >
      <span className="min-w-20 font-mono text-muted-foreground text-xs">
        {dateLabel}
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-1.5 font-medium text-sm">
          {experiment.title}
          <ArrowUpRightIcon
            className="size-3.5 -translate-y-px text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1"
            weight="bold"
          />
        </span>
        <span className="mt-0.5 line-clamp-1 block text-muted-foreground text-xs">
          {experiment.summary}
        </span>
      </span>
      {experiment.status === "draft" ? (
        <Badge className="font-mono text-[10px]" variant="outline">
          draft
        </Badge>
      ) : null}
    </Link>
  );
}
