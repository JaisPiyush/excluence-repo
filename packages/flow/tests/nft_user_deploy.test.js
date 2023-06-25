import path from "path";
import * as fs from "fs"
import { setupInitialContracts } from ".";
import {
    emulator,
    getAccountAddress,
    init,
    sendTransaction,
    shallPass} from "@onflow/flow-js-testing";

// Set basepath of the project
const BASE_PATH = path.resolve(__dirname, "./../");



describe("Testing ExcluenceNFT Deploy", () => {
    const defaultAcct = "0xf8d6e0586b0a20c7"
    beforeAll(async () => {
        await init(BASE_PATH)
        await emulator.start({logging: true})

        await setupInitialContracts(BASE_PATH, defaultAcct)

    })

    afterAll(async () => {
        await emulator.stop()
    })

    test("Script should deploy ExcluenceNFT contract", async () => {
        const interfaceContractAddress = "0xf8d6e0586b0a20c7"
        const account = await getAccountAddress("alice")
        let excluenceNFTContractCode = fs.readFileSync(BASE_PATH + "/contracts/ExcluenceNFT.cdc").toString();
        excluenceNFTContractCode = excluenceNFTContractCode.replace(`"./interfaces/NonFungibleToken.interface.cdc"`, interfaceContractAddress)
        excluenceNFTContractCode = excluenceNFTContractCode.replace(`"./interfaces/MetadataViews.interface.cdc"`, interfaceContractAddress)
        excluenceNFTContractCode = excluenceNFTContractCode.replace(`"./interfaces/ViewResolver.interface.cdc"`, interfaceContractAddress)

        const [deployTx,e] = await shallPass(
            sendTransaction(
                "user/deploy_contract",
                [account],
                [Buffer.from(excluenceNFTContractCode).toString('hex')]
            )
        )
    })
})