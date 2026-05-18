import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ItemGroup } from "@/components/ui/item";
import { ExperimentCard } from "./experiment-card";

const SPRING_TOGGLE_NAME = /spring toggle/i;
const DRAFT_LABEL = /^draft$/i;

const meta = {
  component: ExperimentCard,
  tags: ["ai-generated"],
  title: "lab/ExperimentCard",
} satisfies Meta<typeof ExperimentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Shipped: Story = {
  args: {
    experiment: {
      slug: "spring-toggle",
      title: "Spring toggle",
      date: "2026-05-14",
      tags: ["motion", "spring"],
      status: "shipped",
      summary: "Three spring presets side by side.",
    },
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: SPRING_TOGGLE_NAME });
    await expect(link).toHaveAttribute("href", "/lab/spring-toggle");
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
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(DRAFT_LABEL)).toBeVisible();
  },
};

export const InGroup: Story = {
  render: (args) => (
    <ItemGroup className="w-[480px]">
      <ExperimentCard {...args} />
      <ExperimentCard
        experiment={{
          slug: "another",
          title: "Another one",
          date: "2026-05-10",
          tags: ["motion"],
          status: "shipped",
          summary: "Second card in the group.",
        }}
      />
    </ItemGroup>
  ),
  args: {
    experiment: {
      slug: "spring-toggle",
      title: "Spring toggle",
      date: "2026-05-14",
      tags: ["motion"],
      status: "shipped",
      summary: "Three spring presets side by side.",
    },
  },
};
