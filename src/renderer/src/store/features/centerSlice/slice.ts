import type { CenterState, CenterReducer } from './type'
import { createSlice } from '@reduxjs/toolkit'
import { fetchCurrentDutyThunk } from './thunk'

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
      .addCase(fetchCurrentDutyThunk.pending, (state) => {
        state.currentDuty = 'loading'
      })
      .addCase(fetchCurrentDutyThunk.fulfilled, (state, action) => {
        state.currentDuty = action.payload
      })
      .addCase(fetchCurrentDutyThunk.rejected, (state) => {
        state.currentDuty = null
      })
  }
})

export const { setCurrentDuty, setTicketList } = centerSlice.actions

// 默认导出
export default centerSlice.reducer
