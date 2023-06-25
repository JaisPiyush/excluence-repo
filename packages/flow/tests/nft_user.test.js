import path from "path";
import * as fs from "fs"
import { expect } from "@jest/globals";
import { setupExcluenceNFT, setupInitialContracts } from ".";
import {
    emulator,
    getAccountAddress,
    init,
    sendTransaction,
    shallPass,
    shallRevert,
    shallThrow,
    deployContract,
    getTemplate,
    getTransactionCode,
    getContractAddress
} from "@onflow/flow-js-testing";

// Set basepath of the project
const BASE_PATH = path.resolve(__dirname, "./../");
const interfaceContractAddress = "0xf8d6e0586b0a20c7"
const defaultAcct = "0xf8d6e0586b0a20c7"

const addressMap = {
    "ExcluenceNFT": interfaceContractAddress,
    "FungibleToken": interfaceContractAddress,
    "MetadataViews": interfaceContractAddress,
    "NonFungibleToken": interfaceContractAddress
}

describe("Testing ExcluenceNFT Deploy", () => {
    
    beforeAll(async () => {
        await init(BASE_PATH)
        await emulator.start({logging: false})

        await setupInitialContracts(BASE_PATH, defaultAcct)
        await setupExcluenceNFT(BASE_PATH, defaultAcct)

    })

    afterAll(async () => {
        await emulator.stop()
    })

    test("Should create project", async () => {
        const args = ["The first project", 
                "new project",
                {
                    "fileType": "https",
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt7b4qdih9G-kDB1hYb9whD_nWkCdBmmW4l8kNYogJ&s",
                    "mediaType": "image/*"
                },
                "",
                {
                    "fileType": "ipfs",
                    "cid": "QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X",
                    "mediaType": "image/*"
                },
                {

                },
                {
                    [defaultAcct]: parseFloat(0.6)
                },
                {
                    [defaultAcct]: "Creator earning"
                }
    ];

    const template = await getTransactionCode({
        name: "admin/create_project",
        addressMap
    })


    const [result, err] = await shallPass(
        sendTransaction({
            code: template,
            args,
            signers: [defaultAcct]
        })
    )
    })


    test("Should create component", async () => {
        const args = [
            "The first component",
            {
                "fileType": "ipfs",
                "cid": "QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X",
                "mediaType": "image/*"
            },
            {
                "level": "beginner"
            },
            {
                "levelNumber": parseInt(2)
            },
            {
                "qualified": true
            },
            {
                "marks": parseFloat(0.2856)
            },
            null,
            [],
            {},
            {}
        ]

        const template = await getTransactionCode({
            name: "admin/create_component",
            addressMap
        })

        await shallPass(
            sendTransaction({
                code: template,
                args,
                signers: [defaultAcct]
            })
        )

    })

    test("Should add component to project", async () => {
        const args = [1, [1]]
        const template = await getTransactionCode({
            name: "admin/add_components_to_project",
            addressMap
        })

        await shallPass(
            sendTransaction({
                code: template,
                args,
                signers: [defaultAcct]
            })
        )

    })

    test("should mint an NFT (for same account)", async () => {
        const args = [1,1, defaultAcct]
        const template = await getTransactionCode({
            name: "admin/mint_nft",
            addressMap
        })

        await shallPass(
            sendTransaction({
                code: template,
                args,
                signers: [defaultAcct]
            })
        )
    })
})