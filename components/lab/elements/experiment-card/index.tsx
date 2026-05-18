import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { Experiment } from "@/lib/experiments";

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(experiment.date));

  return (
    <Item render={<Link href={`/lab/${experiment.slug}`} />}>
      <ItemMedia>
        <time
          className="font-mono text-muted-foreground text-xs"
          dateTime={experiment.date}
        >
          {dateLabel}
        </time>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          {experiment.title}
          <ArrowUpRightIcon data-icon="inline-end" />
        </ItemTitle>
        <ItemDescription>{experiment.summary}</ItemDescription>
      </ItemContent>
      {experiment.status === "draft" ? (
        <ItemActions>
          <Badge variant="outline">draft</Badge>
        </ItemActions>
      ) : null}
    </Item>
  );
}
