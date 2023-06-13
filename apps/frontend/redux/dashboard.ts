import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { globalActions } from './global'
import { backendApi } from '../axiosInstance'
import { getAuthorizationHeader } from './utils'
import {ThirdwebSDK} from '@thirdweb-dev/sdk';
import { SyntheticRole } from '../types'
import { signOut } from 'next-auth/react'

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
    syntheticRoles: SyntheticRole[];
    fetchedSyntheticRoles: boolean;
    hasProfile: boolean;
    fetchedMyProfile: boolean;
    currentCollectedContract?: string;
}

const initialState: DashboardState = {
    profiles: [],
    fetchedProfiles: false, 
    roleAddedGuilds: [],
    fetchedGuildRoles: false,
    createdCollections: [],
    fetchedCreatedCollections: false,
    syntheticRoles: [],
    fetchedSyntheticRoles: false,
    hasProfile: false,
    fetchedMyProfile: false,
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
            //TODO: verify address is valid and able to load the metadata
            // const sdk = new ThirdwebSDK("ethereum");
            // const contract = await sdk.getContract(address);
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

export const findMySyntheticRoles = createAsyncThunk(
    'dashboard/findMySyntheticRoles',
    async (obj, thunkAPI) => {
        try {
            thunkAPI.dispatch(globalActions.setLoading(true));
            const res = await backendApi.get<{result: SyntheticRole[]}>('synthetic-role', {
                headers: getAuthorizationHeader()
            })
            thunkAPI.dispatch(globalActions.setLoading(false));
            return res.data.result;
        }catch(e) {
            thunkAPI.dispatch(globalActions.setError("Failed to load roles."))
        }
    }
)


export const createSyntheticRole = createAsyncThunk(
    'dashboard/createSyntheticRole',
    async (params: {role: SyntheticRole, guildIds: string[], collections: string[]}, thunkAPI) => {
        try {
            thunkAPI.dispatch(globalActions.setLoading(true));
            params.role.color = 0;
            params.role.icon = null;
            params.role.unicode_emoji = null;
            const res = await backendApi.post<{result: SyntheticRole}>('synthetic-role', {
                role: params.role,
                guildIds: params.guildIds,
                collections: params.collections
            }, {
                headers: getAuthorizationHeader()
            })
            thunkAPI.dispatch(globalActions.setLoading(false));
            return res.data.result;
        }catch(e) {
            thunkAPI.dispatch(globalActions.setError("Failed to create roles."))
        }
    }
);


export const hasProfile = createAsyncThunk(
    'dashboard/hasProfile',
    async (obj, thunkAPI) => {
        const res = await backendApi.get<{result: boolean}>('profile', {
            headers: getAuthorizationHeader()
        });
        return res.data.result;
    }
);


export const addUserToToleOfCollection = createAsyncThunk(
    'dashboard/addUserToRolesOfCollection',
    async (params: {accessToken: string, address: string}, thunkAPI) => {
        try {
            thunkAPI.dispatch(globalActions.setLoading(true));
            const res = await backendApi.post<{result: boolean}>(`synthetic-role/guild/collection/${params.address}/join`, {
                access_token: params.accessToken
            }, {
                headers: getAuthorizationHeader()
            })
            thunkAPI.dispatch(globalActions.setLoading(false));
            return res.data.result;
        }catch(e) {
            signOut();
            thunkAPI.dispatch(globalActions.setError("Failed to add roles."))
        }
    }
)


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setCurrentCollectedContract: (state, action: PayloadAction<string | undefined>) => {
            state.currentCollectedContract = action.payload;
        }
    },
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
        });
        builder.addCase(findMySyntheticRoles.fulfilled, (state: DashboardState, action) => {
            state.syntheticRoles = action.payload as SyntheticRole[] || [];
            state.fetchedSyntheticRoles = true;
        });
        builder.addCase(hasProfile.fulfilled, (state: DashboardState, action) => {
            state.hasProfile = action.payload as boolean;
            state.fetchedMyProfile = true;
        });
        builder.addCase(addUserToToleOfCollection.fulfilled, (state: DashboardState, action) => {
            state.currentCollectedContract = undefined;
        })
    }
})



export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;