import ExButton from "../components/ExButton";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ExButton> = {
    component: ExButton
}

export default meta

type Story = StoryObj<typeof ExButton>;

export const Primary: Story = {
    args: {
        children: 'Sign Up',
        isPrimary: true
    }
}
