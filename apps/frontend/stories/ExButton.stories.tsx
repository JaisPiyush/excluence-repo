import ExButton from "../components/ExButton";
import { Meta, StoryObj } from '@storybook/react';
import { Typography } from "@mui/material";

const meta: Meta<typeof ExButton> = {
    component: ExButton
}

export default meta

type Story = StoryObj<typeof ExButton>;

export const Primary: Story = {
    args: {
        children: <Typography>Sign Up</Typography>,
        isPrimary: true
    }
}
