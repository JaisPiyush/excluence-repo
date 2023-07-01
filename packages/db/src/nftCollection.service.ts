import { PrismaClient } from "@prisma/client";

export default class NFTCollectionService {
    constructor(public readonly prisma: PrismaClient = new PrismaClient()) {}

    async isExternalURLAvailable(externalURL: string): Promise<boolean> {
        const nfCollection = await this.prisma.nFTCollection.findFirst({
            where: {
                externalURL
            }
        })
        
        return nfCollection === null
    }

    async createNFTCollection(externalURL: string, address: string, contractName: string) {
        const nftCollection = await this.prisma.nFTCollection.create({
            data: {
                externalURL,
                address,
                contractName
            }
        })
        return nftCollection
    }

    async getAllCollection(address: string) {
        return await this.prisma.nFTCollection.findMany({
            where: {
                address
            },
            select: {
                address: true,
                contractName: true,
                externalURL: true
            }
        })
    }
}