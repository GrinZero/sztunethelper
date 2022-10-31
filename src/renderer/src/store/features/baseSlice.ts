import { createSlice } from '@reduxjs/toolkit'

export interface BaseState {
  theme: 'dark' | 'light'
}
export interface BaseReducer {
  setTheme: (state: BaseState, action: { payload: 'dark' | 'light' }) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const initialState: BaseState = {
  theme: 'dark'
}

export const baseSlice = createSlice<BaseState, BaseReducer, 'base'>({
  name: 'base',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    }
  }
})
export const { setTheme } = baseSlice.actions

// 默认导出
export default baseSlice.reducer
