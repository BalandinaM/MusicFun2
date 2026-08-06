import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
  reducers: create => ({
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>(
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }
    ),
  }),
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { setIsLoggedInAC } = authSlice.actions
export const authReducer = authSlice.reducer
