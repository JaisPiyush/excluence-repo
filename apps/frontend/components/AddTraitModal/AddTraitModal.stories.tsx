import {Meta, StoryObj} from "@storybook/react";
import AddTraitModal from "./AddTraitModal";

const meta: Meta<typeof AddTraitModal> = {
    component: AddTraitModal
};

export default meta

type Story = StoryObj<typeof AddTraitModal>;

export const Default: Story = {
    args: {
        open: true,
        onClose: () => {},
        onContinue: (traits) => {}
    }
}