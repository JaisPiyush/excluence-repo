import { NextApiRequest, NextApiResponse } from "next";
import {NFTCollectionService} from "@excluence-repo/db"
import { CollectionOnServer } from "@/utility/types";
import { verifyMessageSignature } from "@/utility";
import { CompositeSignature } from "@onflow/fcl/types/current-user";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({
            error: {
                message: 'Method not supported'
            }
        })
    }else {
        const body = req.body as {collection: CollectionOnServer, signatures: CompositeSignature[]}

        if(!await verifyMessageSignature(JSON.stringify(body.collection), body.signatures) &&
            body.signatures[0].address === body.collection.address
        ) {
            res.status(401).json({
                error: {
                    message: 'Signature verification failed'
                }
            })
            return
        }

        const nftCollectionService = new NFTCollectionService()
        const nftCollection = await nftCollectionService.createNFTCollection(
            body.collection.externalURLSegment,
            body.collection.address,
            body.collection.contractName
        )

        res.status(201).json({
            data: nftCollection
        })
        
    }

    


}