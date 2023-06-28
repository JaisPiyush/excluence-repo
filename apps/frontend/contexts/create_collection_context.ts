import { CreateCollectionAction } from "@/hooks/useCreateCollectionReducer";
import { ICreateCollectionContext } from "@/utility/types";
import { Dispatch, createContext } from "react";


export const CreateCollectionContext = createContext<ICreateCollectionContext>({
    name: null,
    description: null,
    externalURL: null,
    squareImage: null,
    bannerImage: null,
    socials: {},
    royalties: [],
    sectionIndex: 0,
    sectionIndexHasError: {}
})
