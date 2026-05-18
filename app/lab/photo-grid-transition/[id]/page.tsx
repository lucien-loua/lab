import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { PALETTES, getPalette } from "@/experiments/photo-grid-transition/palettes";

export const dynamicParams = false;

export function generateStaticParams() {
  return PALETTES.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = getPalette(id);
  if (!p) return {};
  return { title: `${p.name} — lab` };
}

export default async function PalettePage({ params }: Props) {
  const { id } = await params;
  const palette = getPalette(id);
  if (!palette) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/lab/photo-grid-transition"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" weight="bold" /> back to grid
      </Link>

      <div
        className="mt-6 aspect-[4/5] w-full overflow-hidden rounded-lg sm:aspect-[16/9]"
        style={{
          background: palette.gradient,
          viewTransitionName: `photo-${palette.id}`,
        }}
      />

      <div className="mt-4 flex items-baseline justify-between">
        <h1 className="text-lg font-medium">{palette.name}</h1>
        <span className="font-mono text-xs text-muted-foreground">
          #{palette.id}
        </span>
      </div>
    </main>
  );
}
