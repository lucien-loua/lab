import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { BackLink } from ".";

const BACK_LABEL = /back/i;

const meta = {
  component: BackLink,
  tags: ["ai-generated"],
  title: "lab/elements/BackLink",
} satisfies Meta<typeof BackLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: BACK_LABEL });
    await expect(link).toHaveAttribute("href", "/");
  },
};

export const CustomHref: Story = {
  args: { href: "/lab/hello-world" },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: BACK_LABEL });
    await expect(link).toHaveAttribute("href", "/lab/hello-world");
  },
};
