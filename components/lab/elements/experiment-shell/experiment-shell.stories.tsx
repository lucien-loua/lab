import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ExperimentShell } from ".";

const BACK_LABEL = /back/i;
const TITLE_LABEL = /spring toggle/i;

const meta = {
  component: ExperimentShell,
  tags: ["ai-generated"],
  parameters: { layout: "fullscreen" },
  title: "lab/elements/ExperimentShell",
} satisfies Meta<typeof ExperimentShell>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleExperiment = {
  slug: "spring-toggle",
  title: "Spring toggle",
  date: "2026-05-14",
  tags: ["motion", "spring", "base-ui"],
  status: "shipped" as const,
  summary: "Three spring presets, side by side, on the same toggle.",
};

export const Default: Story = {
  args: {
    experiment: sampleExperiment,
    children: (
      <div className="rounded-lg border bg-muted p-6 text-sm">
        Experiment body goes here.
      </div>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: BACK_LABEL })
    ).toHaveAttribute("href", "/");
    await expect(
      canvas.getByRole("heading", { name: TITLE_LABEL })
    ).toBeVisible();
  },
};

export const NoTags: Story = {
  args: {
    experiment: { ...sampleExperiment, tags: [] },
    children: <div className="text-muted-foreground text-sm">Empty body.</div>,
  },
};
