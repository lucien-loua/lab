# lab

A personal sketchbook by [Lucien Loua](https://github.com/lucien-loua) for UI/UX experiments: micro-interactions, animations, and view transitions. Each experiment is a standalone route, registered in `experiments/registry.ts`.

> Repo: [github.com/lucien-loua/lab](https://github.com/lucien-loua/lab)

## Run

```bash
bun install
bun dev          # http://localhost:3000
bun storybook    # http://localhost:6006
```

Other scripts:

```bash
bun run build       # production build
bun run typecheck   # tsc --noEmit
bun run lint        # ultracite check (biome)
bun run format      # ultracite fix
```

## Add a new experiment

1. Create the folder, the component, and a story:

   ```
   experiments/<slug>/experiment.tsx
   experiments/<slug>/experiment.stories.tsx   # colocated story
   experiments/<slug>/notes.mdx                # optional writeup
   ```

   See [experiments/hello-world](experiments/hello-world) as the canonical example.

   Inside `experiment.tsx`:

   ```tsx
   "use client"; // only if you use Motion, hooks, or browser APIs

   export default function MyExperiment() {
     return <div>...</div>;
   }
   ```

2. Register it in [experiments/registry.ts](experiments/registry.ts):

   ```ts
   import dynamic from "next/dynamic";

   export const REGISTRY: Record<string, RegistryEntry> = {
     "<slug>": {
       title: "My experiment",
       date: "2026-05-18",
       tags: ["motion"],
       status: "draft",
       summary: "What this one is about.",
       Component: dynamic(() => import("./<slug>/experiment")),
     },
   };
   ```

3. That's it. The home page picks it up, the dynamic route renders it, the static params include it, and Storybook discovers the story automatically.

## UI rules (read before adding)

This project follows the [shadcn skill](https://ui.shadcn.com) conventions strictly.

- **Use shadcn components, not custom markup.** Run `bunx --bun shadcn@latest search -q "<thing>"` first. Need a callout? `Alert`. Empty state? `Empty`. Loading? `Skeleton`. Pill? `Badge`.
- **Do not override default styles with `className`.** Use built-in props: `variant="outline"`, `size="sm"`, etc. `className` is for layout only (positioning, margins, flex/grid), never for colors, typography, or borders.
- **Use semantic color tokens** (`bg-muted`, `text-muted-foreground`), never raw Tailwind colors like `bg-blue-500`.
- **Forms use `FieldGroup` + `Field`**, not raw `div` + `Label`.
- **Icons in `Button` use `data-icon`**, no sizing classes.
- **Spacing uses `gap-*`** on a flex/grid container, not `space-y-*`.
- **Equal dimensions use `size-*`**, not `w-* h-*`.

If you need an unstyled wrapper (e.g. a custom card surface), build it from scratch rather than fighting a shadcn component's defaults.

## Add a shadcn component

```bash
bunx --bun shadcn@latest add <component>
```

Already installed: `badge`, `button`, `card`, `input`, `label`, `switch`.

Browse before installing:

```bash
bunx --bun shadcn@latest search -q "<thing>"
bunx --bun shadcn@latest docs <component>
```

## Stack

- Next.js 16 (App Router, Turbopack) with React Compiler and `experimental.viewTransition`
- React 19.2
- TypeScript strict, `noUncheckedIndexedAccess`
- Tailwind CSS v4 via the [shadcn preset](https://ui.shadcn.com) (Luma + Phosphor + Base UI primitives)
- [Motion](https://motion.dev) for animation, gated by `useReducedMotion`
- MDX for writeups
- Storybook 10 (Next.js Vite framework) with a11y addon
- Biome + Ultracite for linting and formatting
- Bun as package manager and runtime

## Notes

- Server components by default. Add `"use client"` only when needed (Motion, state, browser APIs).
- Motion respects `prefers-reduced-motion` everywhere.
- RTL is wired through the shadcn `--rtl` preset.
- View Transitions API is enabled at the platform level; experiments opt in by assigning matching `view-transition-name` styles across routes.
