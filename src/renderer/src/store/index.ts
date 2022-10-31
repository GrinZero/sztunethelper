import { configureStore } from '@reduxjs/toolkit'

import baseSlicer from './features/baseSlice'
import accountSlicer from './features/accountSlice'

const store = configureStore({
  reducer: {
    base: baseSlicer,
    account: accountSlicer
  } // 仓库数据
})
export default store

export * from './features'
