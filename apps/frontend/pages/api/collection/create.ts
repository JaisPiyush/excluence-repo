import { NextApiRequest, NextApiResponse } from "next";
import {NFTCollectionService} from "@excluence-repo/db"
import { CollectionOnServer, SignatureVerificationRequestData } from "@/utility/types";
import { verifyMessageSignature } from "@/utility";
import { CompositeSignature } from "@onflow/fcl/types/current-user";
import { authenticateSignatureBasedRequestData } from "@/utility/server";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({
            error: {
                message: 'Method not supported'
            }
        })
    }else {
        const body = req.body as SignatureVerificationRequestData<CollectionOnServer>

        try {

            await authenticateSignatureBasedRequestData(body);
            if (body.signatures[0].address !== body.packet.data.address) {
                throw new Error("Address does not match")
            }
            const nftCollectionService = new NFTCollectionService()
            const nftCollection = await nftCollectionService.createNFTCollection(
                body.packet.data.externalURLSegment,
                body.packet.data.address,
                body.packet.data.contractName
            )

            res.status(201).json({
                data: nftCollection
            })

        }catch(e) {
            res.status(401).json({
                error: {
                    message: (e as Error).message
                }
            })
        }
        
    }

    


}