import type { CenterState, CenterReducer } from './type'
import { createSlice } from '@reduxjs/toolkit'
import { fetchCurrentBaseDataThunk } from './thunk'

const initialState: CenterState = {
  currentDuty: null,
  ticketList: null
}

export const centerSlice = createSlice<CenterState, CenterReducer, 'center'>({
  name: 'center',
  initialState,
  reducers: {
    setCurrentDuty: (state, action) => {
      state.currentDuty = action.payload
    },
    setTicketList: (state, action) => {
      state.ticketList = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentBaseDataThunk.pending, (state) => {
        state.currentDuty = 'loading'
      })
      .addCase(fetchCurrentBaseDataThunk.fulfilled, (state, action) => {
        state.currentDuty = action.payload?.duty ?? null
        // state.bannerList = action.payload?.banner ?? []
        // state.notice = action.payload?.notice ?? null
      })
      .addCase(fetchCurrentBaseDataThunk.rejected, (state) => {
        state.currentDuty = null
      })
  }
})

export const { setCurrentDuty, setTicketList } = centerSlice.actions

// 默认导出
export default centerSlice.reducer
