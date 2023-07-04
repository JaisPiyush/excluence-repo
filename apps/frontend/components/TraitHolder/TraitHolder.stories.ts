import {Meta, StoryObj} from '@storybook/react';
import TraitHolder from './TraitHolder';


const meta: Meta<typeof TraitHolder> = {
    component: TraitHolder
}

export default meta;

type Story = StoryObj<typeof TraitHolder>;

export const Default: Story = {
    args: {
        traits: {
            traits: [
                {
                    name: 'Player name',
                    value: "De'Andre Hunter",
                },
                {
                    name: 'Team',
                    value: 'Atlanta Hawks'
                },
                {
                    name: 'Tier',
                    value: 'Common'
                },
                {
                    name: 'League',
                    value: "NBA"
                },
                {
                    name: 'Set',
                    value: 'Base Set'
                },
                {
                    name: 'Position',
                    value: 'F'
                }
            ]
        }
    }
}