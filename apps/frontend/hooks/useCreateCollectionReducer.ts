import { ICreateCollectionContext } from "@/utility/types"
import { useReducer } from "react"


const initialState: ICreateCollectionContext = {
    name: null,
    description: null,
    externalURL: null,
    squareImage: null,
    bannerImage: null,
    socials: {},
    royalties: [],
    sectionIndex: 0,
    sectionIndexHasError: {}
}

export enum CreateCollectionActionKind {
    SetSectionIndexHasError,
    SetSectionIndex,
    SetCollectionDetails,
    SetCollectionGraphics
}

export interface CreateCollectionAction {
    type: CreateCollectionActionKind,
    payload: string | Record<string, string> | Array<[string, string, string?]> | number | [number, boolean] | Partial<ICreateCollectionContext>
}

function createCollectionReducer(state: ICreateCollectionContext, action: CreateCollectionAction) {
    switch(action.type) {
        case CreateCollectionActionKind.SetSectionIndex:
            state.sectionIndex = action.payload as number
            return {...state}
        case CreateCollectionActionKind.SetSectionIndexHasError:
            const [index, hasError] = action.payload as [number, boolean]
            state.sectionIndexHasError[index] = hasError
            return {...state}
        case CreateCollectionActionKind.SetCollectionDetails:
            const detailsPayload = action.payload as Pick<ICreateCollectionContext, "name" | "description" | "externalURL">
            state.name = detailsPayload.name
            state.description = detailsPayload.description
            state.externalURL = detailsPayload.externalURL
            return {...state}
        case CreateCollectionActionKind.SetCollectionGraphics:
            let graphicsPayload = action.payload as Pick<ICreateCollectionContext, "squareImage" | "bannerImage">
            state.bannerImage = graphicsPayload.bannerImage
            state.squareImage = graphicsPayload.squareImage
            return {...state}

        default:
            return state
        
            
    }
}

export const useCreateCollectionReducer = (initState?: ICreateCollectionContext) => {
    return useReducer(createCollectionReducer, initState || initialState)
}

