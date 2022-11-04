import { createSlice } from '@reduxjs/toolkit'

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
  [key: string]: any
}

const initialState: AccountState = {
  accountStore: JSON.parse(localStorage.getItem('accountStore') ?? '[]'),
  currentAccount: {
    username: localStorage.getItem('username') ?? '',
    password: localStorage.getItem('password') ?? ''
  }
}

export const accountSlice = createSlice<AccountState, AccountReducer, 'account'>({
  name: 'account',
  initialState,
  reducers: {
    pushAccount: (state, action) => {
      state.accountStore = [action.payload, ...state.accountStore]
      localStorage.setItem('accountStore', JSON.stringify(state.accountStore))
    },
    deleteAccount: (state, action) => {
      state.accountStore = state.accountStore.filter(
        (item) => item.username !== action.payload.username
      )
      localStorage.setItem('accountStore', JSON.stringify(state.accountStore))
    },
    setCurrentAccount: (state, action) => {
      state.currentAccount = { ...action.payload }
      localStorage.setItem('username', action.payload.username)
      localStorage.setItem('password', action.payload.password)
    }
  }
})
export const { pushAccount, deleteAccount, setCurrentAccount } = accountSlice.actions

// 默认导出
export default accountSlice.reducer
