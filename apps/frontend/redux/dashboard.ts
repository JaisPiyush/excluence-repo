import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { globalActions } from './global'
import { backendApi } from '../axiosInstance'
import { getAuthorizationHeader } from './utils'
import {ThirdwebSDK} from '@thirdweb-dev/sdk';

export interface ProfileGuild {
    _id: string;
    guildId: string;
    publicKey: string;
    name?: string;
    icon?: string | null;
    
}

export interface DashboardState {
    profiles: ProfileGuild[],
    fetchedProfiles: boolean,
    roleAddedGuilds: string[],
    fetchedGuildRoles: boolean;
    createdCollections: string[];
    fetchedCreatedCollections: boolean;
}

const initialState: DashboardState = {
    profiles: [],
    fetchedProfiles: false, 
    roleAddedGuilds: [],
    fetchedGuildRoles: false,
    createdCollections: [],
    fetchedCreatedCollections: false
}



export const addGuild = createAsyncThunk(
    'dashboard/addGuild',
    async (guildId: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(globalActions.setLoading(true));
            const res = await backendApi.post('profile/guild', {guildId: guildId}, {
                headers: getAuthorizationHeader()
            });
            thunkAPI.dispatch(globalActions.setLoading(false));
        }catch(e) {
            thunkAPI.dispatch(globalActions.setError("Failed to add discord server"))
        }
    }
);

export const getMyProfiles = createAsyncThunk(
    'dashboard/getMyProfiles',
    async (obj, thunkAPI) => {
        try {
            const res = await backendApi.get<{result: ProfileGuild[]}>('profile/@me', {
                headers: getAuthorizationHeader()
            });
            return res.data.result;
        }catch(e) {
            thunkAPI.dispatch(globalActions.setError("Failed to load discord servers."))
        }
    }
);

export const getSelectedGuildsBySyntheticRoleId = createAsyncThunk(
    'dashboard/getSelectedGuildsBySyntheticRoleId',
    async (roleId: string | undefined, thunkAPI) => {
        try {
            thunkAPI.dispatch(globalActions.setLoading(true));
            if (!roleId) return [];
            const res = await backendApi.get<{result: {guildId: string}[]}>(`synthetic-role/guild/role/${roleId}`, {
                headers: getAuthorizationHeader()
            });
            thunkAPI.dispatch(globalActions.setLoading(false));
            return res.data.result.map((guildRole) => guildRole.guildId);
        }catch(e) {
            thunkAPI.dispatch(globalActions.setError("Failed to load connected guilds."))
        }
    }
);

export const getAllMyNFTCollections = createAsyncThunk(
    'dashboard/getAllMyNFTCollections',
    async (obj, thunkAPI) => {
        const res = await backendApi.get<{result: {address: string}[]}>('nft-collection', {
            headers: getAuthorizationHeader()
        });
        return res.data.result.map((collection) => collection.address);
    }
);

export const importNFTCollections = createAsyncThunk(
    'dashboard/importNFTCollections',
    async (address: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(globalActions.setLoading(true));
            // const sdk = new ThirdwebSDK("ethereum");
            // const contract = await sdk.getContract(address);
            console.log('contract', address)
            const res = await backendApi.post('nft-collection', {contracts: [address]}, {
                headers: getAuthorizationHeader()
            })
            thunkAPI.dispatch(globalActions.setLoading(false));
            return address;
        }catch(e) {
            thunkAPI.dispatch(globalActions.setError("Failed to import collection"))
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyProfiles.fulfilled, (state: DashboardState, action) => {
            state.profiles = action.payload as ProfileGuild[] || [];
            state.fetchedProfiles = true
        });
        builder.addCase(getSelectedGuildsBySyntheticRoleId.fulfilled, (state: DashboardState, action) => {
            state.roleAddedGuilds = action.payload as string[];
            state.fetchedGuildRoles = true;
        });
        builder.addCase(getAllMyNFTCollections.fulfilled, (state: DashboardState, action) => {
            state.createdCollections = action.payload as string[];
            state.fetchedCreatedCollections = true;
        });
        builder.addCase(importNFTCollections.fulfilled, (state: DashboardState, action) => {
            state.createdCollections = state.createdCollections.concat([action.payload as string]);
        })
    }
})

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;