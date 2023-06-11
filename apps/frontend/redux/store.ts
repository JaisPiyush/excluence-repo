import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login';
import globalReducer from './global';
import dashboardReducer from './dashboard';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    global: globalReducer,
    dashboard: dashboardReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch