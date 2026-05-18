# lab

A personal sketchbook for UI/UX experiments: micro-interactions, animations, and view transitions.

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
bun run lint        # eslint
```

## Add a new experiment

1. Create `experiments/<slug>/`.
2. Add `metadata.ts`:

   ```ts
   import type { ExperimentMetadata } from "@/lib/experiments";

   export const metadata: ExperimentMetadata = {
     title: "My experiment",
     date: "2026-05-18",
     tags: ["motion"],
     status: "draft",
     summary: "What this one is about.",
   };
   ```

3. Add `experiment.tsx` exporting a default React component. Add `"use client"` if you use Motion or browser APIs.
4. Register it in `app/lab/[slug]/page.tsx` `REGISTRY`.
5. Optional: write `notes.mdx` next to it.

The home page picks it up automatically.

## Stack

- Next.js 16 (App Router, Turbopack) with React Compiler and `experimental.viewTransition`
- React 19.2
- TypeScript strict, `noUncheckedIndexedAccess`
- Tailwind CSS v4 via the [shadcn preset](https://ui.shadcn.com)
- [Base UI](https://base-ui.com) for accessible primitives
- [Motion](https://motion.dev) for animation, gated by `useReducedMotion`
- MDX for writeups
- Storybook 10 (Next.js Vite framework) with a11y addon
- Bun as package manager and runtime

## Notes

- Server components by default. `"use client"` only where Motion or browser APIs require it.
- Motion respects `prefers-reduced-motion` everywhere.
- RTL is wired through the shadcn `--rtl` preset.
- View Transitions API is enabled at the platform level; experiments opt in by assigning matching `view-transition-name` styles across routes.
