import { CompositeSignature } from "@onflow/fcl/types/current-user"

export type User =  {addr?: string, loggedIn: boolean | null} & Record<string, unknown>



export interface ICreateCollectionContext {
    name: string | null
    description: string | null
    externalURL: string | null
    squareImage: string | null
    bannerImage: string | null
    socials: Record<string, string>
    royalties: Array<[string, string, string?]>,
    sectionIndex: number,
    sectionIndexHasError: Record<number, boolean>
}


export interface NFTMetadataViewsEdition {
    name: string
    number: number
    max: number
}

export interface NFTMetadataViewsSerial {
    number: number
}

export interface NFTMetadataViewsEditions {
    infoList: NFTMetadataViewsEdition[]
}

export interface CollectionOnServer {
    externalURL: string;
    address: string;
    contractName: string;
}

export interface SignatureVerificationRequestData<T> {
    packet: {
        data: T,
        nonce: number
    },
    signatures: CompositeSignature[]
}

export interface FlowPath {
    domain: string;
    identifier: string;
}
export interface NFTCollectionData {
    collectionBannerImage: string;
    collectionDescription: string;
    collectionExternalURL: string;
    collectionName: string;
    collectionProviderLinedType: string;
    collectionPublic: string;
    collectionSquareImage: string;
    collectionProviderPath: FlowPath;
    collectionPublicPath: FlowPath;
    collectionStoragePath: FlowPath;
}

export interface Rarity {
    score?: number | null;
    max?: number | null;
    description?: string | null;
}

export interface Trait {
    name: string;
    value: string | number | boolean;
    displayType?: string | null;
    rarity?: Rarity | null;
}


export interface NFTTraits {
    traits: Array<Trait>;
}

export interface MintNFTArgs {
    name: string;
    description: string;
    thumbnail: string;
    metadata: Record<string, string>;
    collectionName: string;
}

export interface BatchNFTArgs extends MintNFTArgs {
    quantity: string
}

export interface NFTOnlyData {
    id: number;
    uuid?: number;
    owner: string;
    name: string;
    description: string;
    thumbnail: string;
    royalties: unknown[];
    externalURL: string;
    traits: NFTTraits;
    editions: NFTMetadataViewsEditions | null;
    serial: NFTMetadataViewsSerial | null;
}

type NFTView = NFTOnlyData & Omit<NFTCollectionData, "collectionExternalURL">

export interface NFTViewWithContractData extends NFTView {
    address: string;
    contractName: string;
}

export interface NFTMarketplacePriceData {
    price?: string;
    highestBid?: string;
    currency?: string;
    showBuyNow?: boolean;
}