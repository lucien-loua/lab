import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import HelloWorldExperiment from "./experiment";

const INCREMENT_LABEL = /increment/i;

const meta = {
  component: HelloWorldExperiment,
  tags: ["ai-generated"],
  title: "experiments/HelloWorld",
} satisfies Meta<typeof HelloWorldExperiment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: INCREMENT_LABEL });
    await userEvent.click(button);
    await waitFor(() => expect(canvas.getByText("1")).toBeVisible());
  },
};
