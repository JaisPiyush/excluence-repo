import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { backendApi } from '../axiosInstance';
import { clearAuthorizationToken, getAuthorizationHeader, setAuthorizationToken } from './utils';
import { globalActions } from './global';
import { signOut } from 'next-auth/react';

export interface LoginState {
    address?: string;
}

const initialState: LoginState = {

}


export const getAddress = createAsyncThunk(
    'login/getAddress',
    async (obj, thunkAPI) => {
        // thunkAPI.dispatch(globalActions.setLoading(true));
        const res = await backendApi.get<{result: string}>('auth', {
            headers: {...getAuthorizationHeader()}
        });
        // thunkAPI.dispatch(globalActions.setLoading(false));
        return res.data.result;
    }
)

export const login = createAsyncThunk(
    'login/login',
    async (idToken: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(globalActions.setLoading(true));
            const res = await backendApi.post<{access_token: string}>('auth/login', {idToken});
            const token = res.data.access_token;
            setAuthorizationToken(token);
            await thunkAPI.dispatch(getAddress());
            thunkAPI.dispatch(globalActions.setLoading(false));
            return token;
        }catch(e){
            // thunkAPI.dispatch(globalActions.setLoading(false));
            thunkAPI.dispatch(globalActions.setError("login failed"))
        }        
    }
);



export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logOut: (state) => {
            state.address = undefined;
            clearAuthorizationToken();
            signOut()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAddress.fulfilled, (state: LoginState, action: PayloadAction<string>) => {
            state.address = action.payload;

        })
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;