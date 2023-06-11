import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { globalActions } from './global'
import { backendApi } from '../axiosInstance'
import { getAuthorizationHeader } from './utils'
import { getGuild } from '@excluence-repo/discord-connector'

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
}

const initialState: DashboardState = {
    profiles: [],
    fetchedProfiles: false
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
            thunkAPI.dispatch(globalActions.setError("Failed to load discord servers." + e.message))
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
        })
    }
})

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;