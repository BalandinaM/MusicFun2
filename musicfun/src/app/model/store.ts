import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { playlistsApi } from '@/features/playlists/api/playlistsApi.ts'
import { authReducer, authSlice } from '@/features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    [authSlice.name]: authReducer,
    [playlistsApi.reducerPath]: playlistsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(playlistsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
