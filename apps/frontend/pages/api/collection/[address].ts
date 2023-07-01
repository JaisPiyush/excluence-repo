import { NextApiRequest, NextApiResponse } from "next";
import {NFTCollectionService} from "@excluence-repo/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            throw new Error('Method not supported')
        }
        const {address} = req.query
        const nftCollectionService = new NFTCollectionService()
        const collections = await nftCollectionService.getAllCollection(address as string)
        nftCollectionService.prisma.$disconnect()
        res.status(200).json({
            data: collections
        })
    }catch (e) {
        res.status(400).json({
            error: {
                message: (e as Error).message
            }
        })
    }

}