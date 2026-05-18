import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExperimentCard } from "./experiment-card";

const meta: Meta<typeof ExperimentCard> = {
  title: "lab/ExperimentCard",
  component: ExperimentCard,
};

export default meta;

type Story = StoryObj<typeof ExperimentCard>;

export const Shipped: Story = {
  args: {
    experiment: {
      slug: "spring-toggle",
      title: "Spring toggle",
      date: "2026-05-14",
      tags: ["motion", "spring"],
      status: "shipped",
      summary: "Three spring presets side by side.",
      hasNotes: true,
    },
  },
};

export const Draft: Story = {
  args: {
    experiment: {
      slug: "wip",
      title: "Untitled draft",
      date: "2026-05-18",
      tags: ["wip"],
      status: "draft",
      summary: "Still cooking.",
      hasNotes: false,
    },
  },
};
