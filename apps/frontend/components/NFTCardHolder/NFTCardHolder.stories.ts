import {Meta, StoryObj} from "@storybook/react"
import NFTCardHolder from "./NFTCardHolder"

const meta: Meta<typeof NFTCardHolder> = {
    component: NFTCardHolder
}

export default meta

type Story = StoryObj<typeof NFTCardHolder>;

const nfts = [
    {
        id: 1,
        name: 'Wrapped Cryptopunks',
        description: '',
        thumbnail: 'https://lh3.googleusercontent.com/V1dtR6eNpsgPAzAhwJCVqNUammjNd1zqK6TR4XuhjfyLBC10yhpMY1Z9IMyTatkFD9m292W8w9M-6KdTJT8MMJOsyPard_Zq-88=s400',
        editions: {
            infoList: [
                {
                    name: 'Wrapped Cryptopunks',
                    number: 1445,
                    max: 20000
                }
            ]
        },
        royalties: [],
        externalURL: '',
        traits: {traits: []},
        serial: {
            number: 0
        },
        address: '',
        contractName: 'SemiCollection'
    },
    {
        id: 2,
        name: 'Wrapped Cryptopunks',
        description: '',
        thumbnail: 'https://lh3.googleusercontent.com/V1dtR6eNpsgPAzAhwJCVqNUammjNd1zqK6TR4XuhjfyLBC10yhpMY1Z9IMyTatkFD9m292W8w9M-6KdTJT8MMJOsyPard_Zq-88=s400',
        editions: {
            infoList: [
                {
                    name: 'Wrapped Cryptopunks',
                    number: 1445,
                    max: 20000
                }
            ]
        },
        royalties: [],
        externalURL: '',
        traits: {traits: []},
        serial: {
            number: 0
        },
        address: '',
        contractName: 'SemiCollection'
    },
    {
        id: 3,
        name: 'Wrapped Cryptopunks',
        description: '',
        thumbnail: 'https://lh3.googleusercontent.com/V1dtR6eNpsgPAzAhwJCVqNUammjNd1zqK6TR4XuhjfyLBC10yhpMY1Z9IMyTatkFD9m292W8w9M-6KdTJT8MMJOsyPard_Zq-88=s400',
        editions: {
            infoList: [
                {
                    name: 'Wrapped Cryptopunks',
                    number: 1445,
                    max: 20000
                }
            ]
        },
        royalties: [],
        externalURL: '',
        traits: {traits: []},
        serial: {
            number: 0
        },
        address: '',
        contractName: 'SemiCollection'
    },
    {
        id: 4,
        name: 'Wrapped Cryptopunks',
        description: '',
        thumbnail: 'https://lh3.googleusercontent.com/V1dtR6eNpsgPAzAhwJCVqNUammjNd1zqK6TR4XuhjfyLBC10yhpMY1Z9IMyTatkFD9m292W8w9M-6KdTJT8MMJOsyPard_Zq-88=s400',
        editions: {
            infoList: [
                {
                    name: 'Wrapped Cryptopunks',
                    number: 1445,
                    max: 20000
                }
            ]
        },
        royalties: [],
        externalURL: '',
        traits: {traits: []},
        serial: {
            number: 0
        },
        address: '',
        contractName: 'SemiCollection'
    }
]

export const Default: Story = {
    args: {
        nfts: nfts
    }
}