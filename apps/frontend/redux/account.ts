import { CollectionOnServer, NFTViewWithContractData, User } from "@/utility/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


interface AccountState {
    user: User,
    collections: CollectionOnServer[];
    nfts: NFTViewWithContractData[];
    nftIDS: number[];
    fetchedCollection: boolean;
    fetchedNFTIds: number[];
    fetchedNFTDataFromIds: number[];
}

const initialState: AccountState = {
    user: {
        loggedIn: null
    },
    collections: [],
    nftIDS: [],
    nfts: [],
    fetchedCollection: false,
    fetchedNFTDataFromIds:[],
    fetchedNFTIds: [],
}




const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | undefined>) {
            state.user = action.payload || {
                loggedIn: null
            }
        },
        setCollections(state, action: PayloadAction<CollectionOnServer[]>) {
            state.collections = action.payload;
        },
        setNFTs(state, action: PayloadAction<NFTViewWithContractData[]>) {
            state.nfts = action.payload;
        }
    }
})

const accountActions = accountSlice.actions

export {accountActions}

export default accountSlice.reducer