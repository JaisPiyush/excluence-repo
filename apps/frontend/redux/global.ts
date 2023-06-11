import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface GlobalState {
    loading: boolean;
    error: string | null;
}

const initialState: GlobalState = {
    loading: false,
    error: null
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading(state: GlobalState, action: PayloadAction<boolean>) {
            state.loading = action.payload;
            // state.error = action.payload ? null : state.error;
        },
        setError(state: GlobalState, action: PayloadAction<string | null>) {
            state.loading = action.payload !== null ? false: state.loading;
            state.error = action.payload;
            // state.loading = action.payload !== null ? false: state.loading;
        }
    }
})

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;