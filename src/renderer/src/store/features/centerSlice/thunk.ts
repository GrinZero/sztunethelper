import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBaseData } from '@renderer/api'

export const fetchCurrentBaseDataThunk = createAsyncThunk('center/fetchBaseData', async () => {
  const res = await fetchBaseData()
  const data = res.data?.data
  if (data) {
    return data
  }
  return null
})
