import { User } from "@/utility/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


interface AccountState {
    user: User
}

const initialState: AccountState = {
    user: {
        loggedIn: null
    }
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | undefined>) {
            state.user = action.payload || {
                loggedIn: null
            }
        }
    }
})

const accountActions = accountSlice.actions

export {accountActions}

export default accountSlice.reducer