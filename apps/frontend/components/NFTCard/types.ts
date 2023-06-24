


export interface NFTHttpFile {
    url: string
}

export interface NFTIpfsFile {
    cid: string;
    path?: string
}

export type NFTFile = NFTHttpFile | NFTIpfsFile

export interface NFTMetadataViewsDisplay {
    name: string
    description: string
    thumbnail: NFTFile 
    medias?: NFTFile[]
}

export interface NFTMetadataViewsExternalURL {
    url: string
}

export interface NFTMetadataViewsEdition {
    name: string
    number: number
    max: number
}

export interface NFTMetadataViewsEditions {
    infoList: NFTMetadataViewsEdition[]
}