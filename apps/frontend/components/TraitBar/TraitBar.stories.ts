import { Meta, StoryObj } from '@storybook/react';
import TraitBar from "./TraitBar";

const meta: Meta<typeof TraitBar> = {
    component: TraitBar
}

export default meta;

type Story = StoryObj<typeof TraitBar>

export const Default: Story = {
    args: {
        name: 'Player name',
        value: 'Dunker kirk'
    }
}

export const TraitWithDelete: Story = {
    args: {
        name: 'Player name',
        value: 'Dunker kirk',
        onDelete: () => {
            
        },
    }
}