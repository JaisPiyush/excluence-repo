import { PrismaClient } from "@prisma/client";

export default class NFTCollectionService {
    constructor(public readonly prisma: PrismaClient = new PrismaClient()) {}

    async isExternalURLAvailable(externalURLSegment: string): Promise<boolean> {
        const nfCollection = await this.prisma.nFTCollection.findUnique({
            where: {
                externalURLSegment: externalURLSegment
            }
        })
        
        return nfCollection === null
    }
}