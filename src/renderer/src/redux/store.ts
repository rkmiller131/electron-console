import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from './gameSlice'
import appsReducer from './dashboardSlice'

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    apps: appsReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
