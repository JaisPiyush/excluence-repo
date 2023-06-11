import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { backendApi } from '../axiosInstance';
import { ExtraReducerPayload } from './types';
import { getAuthorizationHeader, setAuthorizationToken } from './utils';

export interface LoginState {
    address?: string;
    loading: boolean;
    loginError: boolean;
}

const initialState: LoginState = {
    loading: false,
    loginError: false
}

const getAddress = createAsyncThunk(
    'login/getAddress',
    async (thunkAPI) => {
        const res = await backendApi.get<{result: string}>('auth', {
            headers: {...getAuthorizationHeader()}
        });
        return res.data.result;
    }
)

const login = createAsyncThunk(
    'login/login',
    async (idToken: string, thunkAPI) => {
        const res = await backendApi.post<{access_token: string}>('auth/login', {idToken});
        const token =  res.data.access_token;
        setAuthorizationToken(token);
        thunkAPI.dispatch(getAddress());
        return token;
    }
);



export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAddress.fulfilled, (state: LoginState, action: PayloadAction<string>) => {
            state.loading = false;
            state.loginError = false;
            state.address = action.payload;

        })
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;