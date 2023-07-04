import {Meta, StoryObj} from "@storybook/react";
import AddTrait from "./AddTrait";

const meta: Meta<typeof AddTrait> = {
    component: AddTrait
}

export default meta;

type Story = StoryObj<typeof AddTrait>;

export const Default: Story = {
    args: {}
}