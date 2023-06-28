import { ICreateCollectionContext } from "@/utility/types"
import { useReducer } from "react"


const initialState: ICreateCollectionContext = {
    name: null,
    description: null,
    externalURL: null,
    squareImage: null,
    bannerImage: null,
    socials: {},
    royalties: []
}

export enum CreateCollectionActionKind {

}

interface CreateCollectionAction {
    type: CreateCollectionActionKind,
    payload: string | Record<string, string> | Array<[string, string, string?]>
}

function createCollectionReducer(state: ICreateCollectionContext, action: CreateCollectionAction) {
    return state
}

export const useCreateCollectionReducer = (initState?: ICreateCollectionContext) => {
    return useReducer(createCollectionReducer, initState || initialState)
}