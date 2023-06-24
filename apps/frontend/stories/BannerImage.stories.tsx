import { Meta, StoryObj } from '@storybook/react';
import BannerImage from '@/components/BannerImage';


const meta: Meta<typeof BannerImage> = {
    component: BannerImage
}

export default meta

type Story = StoryObj<typeof BannerImage>

export const HTTPBanner: Story = {
    args: {
        src: 'https://images.pexels.com/photos/17058050/pexels-photo-17058050/free-photo-of-wood-light-sea-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
}