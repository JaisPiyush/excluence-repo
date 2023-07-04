import {Meta, StoryObj} from "@storybook/react";
import SelectCollection from "./SelectCollection";

const meta: Meta<typeof SelectCollection> = {
    component: SelectCollection
}

export default meta;

type Story = StoryObj<typeof SelectCollection>

export const Default: Story = {
    args: {
        collections: [
            {
                contractName: "Kylien",
                address: "",
                externalURL: ""
            },
            {
                contractName: "Mbaape",
                address: "",
                externalURL: ""
            }
        ]
    }
}