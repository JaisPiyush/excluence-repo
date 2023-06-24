import { Meta, StoryObj } from '@storybook/react';
import ImageMediaRenderer from "../components/MediaRenderer/ImageMediaRenderer"

const meta: Meta<typeof ImageMediaRenderer> = {
    component: ImageMediaRenderer
}

export default meta 

type Story = StoryObj<typeof ImageMediaRenderer>;

export const HTTPImage: Story = {
    args: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt7b4qdih9G-kDB1hYb9whD_nWkCdBmmW4l8kNYogJ&s',
        alt: 'Profile',
        width: 200,
        height: 200,
        tabletWidth: 400,
        tabletHeight: 400,
        style: {
            borderRadius: '0.5rem'
        }
    }
}