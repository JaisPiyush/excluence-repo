import { Meta, StoryObj } from '@storybook/react';
import NFTCard from '@/components/NFTCard';

const meta: Meta<typeof NFTCard> = {
    component: NFTCard
}

export default meta

type Story = StoryObj<typeof NFTCard>

export const TabletNFTCard: Story = {
    args: {
        id: 1,
        display: {
            name: 'Wrapped Cryptopunks',
            description: '',
            thumbnail: {
                url: 'https://lh3.googleusercontent.com/V1dtR6eNpsgPAzAhwJCVqNUammjNd1zqK6TR4XuhjfyLBC10yhpMY1Z9IMyTatkFD9m292W8w9M-6KdTJT8MMJOsyPard_Zq-88=s400'
            }
        },
        editions: {
            infoList: [
                {
                    name: 'Wrapped Cryptopunks',
                    number: 1445,
                    max: 20000
                }
            ]
        }
    }
}