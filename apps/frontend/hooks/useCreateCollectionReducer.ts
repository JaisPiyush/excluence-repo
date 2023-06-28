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
            const payload = action.payload as Pick<ICreateCollectionContext, "name" | "description" | "externalURL">
            state.name = payload.name
            state.description = payload.description
            state.externalURL = payload.externalURL
            return {...state}
        default:
            return state
        
            
    }
}

export const useCreateCollectionReducer = (initState?: ICreateCollectionContext) => {
    return useReducer(createCollectionReducer, initState || initialState)
}

