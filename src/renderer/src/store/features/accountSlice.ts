import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import type { AccountInStore } from '../../pages/Login/AccountStore'
import { Account } from '@renderer/types'

export interface AccountState {
  accountStore: AccountInStore[]
  currentAccount: Account
}
export interface AccountReducer {
  pushAccount: (state: AccountState, action: { payload: AccountInStore }) => void
  deleteAccount: (state: AccountState, action: { payload: Account }) => void
  setCurrentAccount: (state: AccountState, action: { payload: Account }) => void
  init: (state: AccountState, action: { payload: any }) => void
  [key: string]: any
}

const initialState: AccountState = {
  accountStore: [],
  currentAccount: {
    username: '',
    password: ''
  }
}

const initAccount = createAsyncThunk('account/init', async () => {
  const username = await window.storage.get<string>('username')
  const password = await window.storage.get<string>('password')
  const accountStore = (await window.storage.get<AccountInStore[]>('accountStore')) ?? []
  return { accountStore, username, password }
})

export const accountSlice = createSlice<AccountState, AccountReducer, 'account'>({
  name: 'account',
  initialState,
  reducers: {
    pushAccount: (state, action) => {
      state.accountStore = [action.payload, ...state.accountStore]
      window.storage.set('accountStore', state.accountStore)
    },
    deleteAccount: (state, action) => {
      state.accountStore = state.accountStore.filter(
        (item) => item.username !== action.payload.username
      )
      window.storage.set('accountStore', state.accountStore)
    },
    setCurrentAccount: (state, action) => {
      state.currentAccount = { ...action.payload }
      window.storage.set('username', action.payload.username)
      window.storage.set('password', action.payload.password)
    },
    init: (state, { payload: { accountStore, username, password } }) => {
      state.accountStore = accountStore
      state.currentAccount = {
        username,
        password
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAccount.fulfilled, (state, action) => {
        state.accountStore = action.payload.accountStore
        state.currentAccount = {
          username: action.payload.username,
          password: action.payload.password
        }
      })
      .addCase(initAccount.rejected, () => {
        console.error('initAccount rejected')
      })
  }
})
export const { pushAccount, deleteAccount, setCurrentAccount } = accountSlice.actions
export { initAccount }

// 默认导出
export default accountSlice.reducer
