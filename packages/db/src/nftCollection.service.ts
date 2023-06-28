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

    async createNFTCollection(segment: string, address: string, contractName: string) {
        const nftCollection = await this.prisma.nFTCollection.create({
            data: {
                externalURLSegment: segment,
                address,
                contractName
            }
        })
        return nftCollection
    }

    async getAllCollections(address: string) {
        return await this.prisma.nFTCollection.findMany({
            where: {
                address
            },
            select: {
                address: true,
                contractName: true,
                externalURLSegment: true
            }
        })
    }
}