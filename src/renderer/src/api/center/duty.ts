import axiosClient from '../axiosClient'
import { useSelector, useDispatch } from 'react-redux'
import type { ApiResult } from '../type'
import { useEffect } from 'react'
import { CenterState, fetchCurrentDutyThunk } from '@renderer/store'

export interface Duty {
  id: string
  name: string
  avatarUrl: string
  desc: string
  contact: string
  rate: number | null
  contactType: 'socket' | 'mail' | 'image' | 'other'
}
export const fetchCurrentDuty = async () => {
  const url = '/public/getDuty'
  return await axiosClient.get<ApiResult<Duty>>(url)
}

export const useCurrentDuty = () => {
  const dispatch = useDispatch()
  const { currentDuty } = useSelector((state: any) => state.center) as CenterState
  useEffect(() => {
    if (currentDuty === null) {
      console.info('fetchCurrentDutyThunk:useCurrentDuty')
      dispatch(fetchCurrentDutyThunk())
    }
  }, [])
  return currentDuty as Duty | null
}
