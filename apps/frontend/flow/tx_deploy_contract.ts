import {TxOpts, tx} from "./utils/tx"
import DEPLOY_CONTRACT_TXN from "@excluence-repo/flow/transactions/user/deploy_contract.cdc"
import NFTTemplateContract from "@excluence-repo/flow/contracts/NFTTemplate.cdc"
import {} from "@onflow/fcl"
import { ICreateCollectionContext } from "@/utility/types"
import { replaceAddress } from "./utils"
import { encodeHex } from "@/utility"
import { createNFTCollection } from "@/api/createCollection"

export async function deployContract(
    createCollectionData: ICreateCollectionContext,
    opts: TxOpts = {}    
) {
    let contractName = createCollectionData.name as string;
    contractName = contractName.split(" ").map((word) => {
        return word[0].toUpperCase() + word.substring(1)
    }
    
    ).join("")

    if (!contractName.includes('NFT')) {
        contractName += "NFT"
    }


    let contract = replaceAddress(NFTTemplateContract).replaceAll("NFTTemplate", contractName)
    contract  = encodeHex(contract)
    let deployContract = replaceAddress(DEPLOY_CONTRACT_TXN)

    let royaltyCuts: Array<{key: string, value: string}> = []

    for (const [address, cut, ] of createCollectionData.royalties) {
        royaltyCuts.push({key: address, value: (parseFloat(cut) / 100).toFixed(4)})
    }

    let squareImage = [
        {key: 'fileType', value: 'ipfs'},
        {key: 'mediaType', value: 'image/*'},
        {key: 'cid', value: createCollectionData.squareImage}
    ]

    let bannerImage = [
        {key: 'fileType', value: 'ipfs'},
        {key: 'mediaType', value: 'image/*'},
        {key: 'cid', value: createCollectionData.bannerImage}
    ]

    const socials: Array<{key: string, value: string}> = []
    for (const [key, value] of Object.entries(createCollectionData.socials)) {
        socials.push({key, value})
    }

    opts.onSuccess = async (txStatus: any) => {
        
        const pathname = (new URL(createCollectionData.externalURL as string)).pathname
        const segment = pathname.replace('/collection/', '')
        await createNFTCollection({contractName, externalURLSegment: segment})
        if (opts.onSuccess) {
            opts.onSuccess(txStatus)
        }
    }

    return tx({
        cadence: deployContract,
        args: (arg, t) => [
            arg(contractName, t.String),
            arg(contract, t.String),
            arg(createCollectionData.name, t.String),
            arg(createCollectionData.description as string, t.String),
            arg(createCollectionData.externalURL as string, t.String),
            arg(squareImage, t.Dictionary({key: t.String, value: t.String})),
            arg(bannerImage, t.Dictionary({key: t.String, value: t.String})),
            arg(socials, t.Dictionary({key: t.String, value: t.String})),
            arg(royaltyCuts, t.Dictionary({key: t.Address, value: t.UFix64})),
            arg([], t.Dictionary({key: t.Address, value: t.String}))
        ]
    }, opts)

}