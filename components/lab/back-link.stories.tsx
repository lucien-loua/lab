import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { BackLink } from "./experiment-shell";

const BACK_LABEL = /back/i;
const MUTED_TOKEN = /muted token/i;

const meta = {
  component: BackLink,
  tags: ["ai-generated"],
  title: "lab/BackLink",
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
  args: { href: "/lab/photo-grid-transition" },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: BACK_LABEL });
    await expect(link).toHaveAttribute("href", "/lab/photo-grid-transition");
  },
};

// CssCheck — verifies that ../app/globals.css is loaded in the preview by
// reading a Tailwind v4 shadcn token from the body element.
export const CssCheck: Story = {
  tags: ["ai-generated", "css-check"],
  render: () => (
    <div className="rounded-md bg-muted px-3 py-2 text-muted-foreground text-sm">
      muted token
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByText(MUTED_TOKEN);
    const bg = window.getComputedStyle(el).backgroundColor;
    // Tailwind would leave `bg-muted` transparent if globals.css never loaded.
    await expect(bg).not.toBe("rgba(0, 0, 0, 0)");
    await expect(bg).not.toBe("transparent");
  },
};
