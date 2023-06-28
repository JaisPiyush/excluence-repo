import { ICreateCollectionContext } from "@/utility/types";
import { createContext } from "react";


export const CreateCollectionContext = createContext<ICreateCollectionContext>({
    name: null,
    description: null,
    externalURL: null,
    squareImage: null,
    bannerImage: null,
    socials: {},
    royalties: []
})