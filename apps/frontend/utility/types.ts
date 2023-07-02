import { CompositeSignature } from "@onflow/fcl/types/current-user"
import type { NextRequest } from "next/server"
import mongoose from "mongoose"

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