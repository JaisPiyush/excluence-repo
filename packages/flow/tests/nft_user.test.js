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
    deployContract
} from "@onflow/flow-js-testing";

// Set basepath of the project
const BASE_PATH = path.resolve(__dirname, "./../");



describe("Testing ExcluenceNFT Deploy", () => {
    const defaultAcct = "0xf8d6e0586b0a20c7"
    const krita = "0x01cf0e2f2f71545"
    beforeAll(async () => {
        await init(BASE_PATH)
        await emulator.start({logging: true})

        await setupInitialContracts(BASE_PATH, defaultAcct)
        await setupExcluenceNFT(BASE_PATH, krita)

    })

    afterAll(async () => {
        await emulator.stop()
    })

    test("Should setup account on krita", async () => {
        
    })
})