import { NextApiRequest, NextApiResponse } from "next";
import {NFTCollectionService} from "@excluence-repo/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query
    if (query['url']) {
        const nftCollectionService = new NFTCollectionService();
        nftCollectionService.prisma.$disconnect()
        res.status(200).json({
            data: await nftCollectionService.isExternalURLAvailable(query['url'] as string)
        })
        
    }else {
        res.status(400).json({
            error: {
                message: 'Bad request: segment is missing'
            }
        })
    }

}