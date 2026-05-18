import Link from "next/link";
import { PALETTES } from "./palettes";

export default function PhotoGridTransitionExperiment() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {PALETTES.map((p) => (
        <Link
          key={p.id}
          href={`/lab/photo-grid-transition/${p.id}`}
          aria-label={`Open ${p.name}`}
          className="aspect-square overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <div
            className="size-full"
            style={{
              background: p.gradient,
              viewTransitionName: `photo-${p.id}`,
            }}
          />
        </Link>
      ))}
    </div>
  );
}
