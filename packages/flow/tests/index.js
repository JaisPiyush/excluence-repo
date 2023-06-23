import {
    deployContract
} from "@onflow/flow-js-testing";
import * as fs from "fs"

export async function setupInitialContracts(BASE_PATH, acct) {
    let nonFungible =  fs.readFileSync(BASE_PATH + "/contracts/interfaces/NonFungibleToken.interface.cdc").toString();
    let fungible = fs.readFileSync(BASE_PATH + "/contracts/interfaces/FungibleToken.interface.cdc").toString();
    let viewResolver = fs.readFileSync(BASE_PATH + "/contracts/interfaces/ViewResolver.interface.cdc").toString();
    let metadataViews = fs.readFileSync(BASE_PATH + "/contracts/interfaces/MetadataViews.interface.cdc").toString();

    metadataViews = metadataViews.replace(`"./FungibleToken.interface.cdc"`, acct)
    metadataViews = metadataViews.replace(`"./NonFungibleToken.interface.cdc"`, acct)
    await deployContract({
        name: "NonFungibleToken",
        code: nonFungible,
        to: acct
    })
    await deployContract({
        name: "FungibleToken",
        code: fungible,
        to: acct
    })
    await deployContract({
        name: "ViewResolver",
        code: viewResolver,
        to: acct
    })
    await deployContract({
        name: "MetadataViews",
        code: metadataViews,
        to: acct
    })
}

export async function setupExcluenceNFT(BASE_PATH, acct) {
    const interfaceContractAddress = "0xf8d6e0586b0a20c7"
    let excluenceNFTContractCode = fs.readFileSync(BASE_PATH + "/contracts/ExcluenceNFT.cdc").toString();
    excluenceNFTContractCode = excluenceNFTContractCode.replace(`"./interfaces/NonFungibleToken.interface.cdc"`, interfaceContractAddress)
    excluenceNFTContractCode = excluenceNFTContractCode.replace(`"./interfaces/MetadataViews.interface.cdc"`, interfaceContractAddress)
    excluenceNFTContractCode = excluenceNFTContractCode.replace(`"./interfaces/ViewResolver.interface.cdc"`, interfaceContractAddress)
    await deployContract({
        name: "ExcluenceNFT",
        code: excluenceNFTContractCode,
        to: acct
    })
}