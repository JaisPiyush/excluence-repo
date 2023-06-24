import { Meta, StoryObj } from '@storybook/react';
import SquareImage from '../components/SquareImage';
import profile from '../public/img/opt-profiles/6.webp'

const meta: Meta<typeof SquareImage> = {
    component: SquareImage
}

export default meta

type Story = StoryObj<typeof SquareImage>

export const Primary: Story = {
    args: {
        src: profile
    }
}

export const Ipfs: Story = {
    args: {
        cid: 'QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X'
    }
}