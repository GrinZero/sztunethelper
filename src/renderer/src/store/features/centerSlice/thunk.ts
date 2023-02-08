import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCurrentDuty } from '@renderer/api'

export const fetchCurrentDutyThunk = createAsyncThunk('center/fetchCurrentDuty', async () => {
  const res = await fetchCurrentDuty()
  const data = res.data?.data
  if (data) {
    return data
  }
  return null
})
