import axiosClient from '../axiosClient'
import { useSelector, useDispatch } from 'react-redux'
import type { ApiResult } from '../type'
import { useEffect } from 'react'
import { CenterState, fetchCurrentBaseDataThunk } from '@renderer/store'

export interface Duty {
  id: number
  name: string
  avatarUrl: string
  desc: string
  contact: string
  rate: number | null
  mail: string
  contactType: 'socket' | 'mail' | 'image' | 'other'
}

export interface CenterData {
  duty: Duty
  banner: Array<{ id: number; title: string; url: string }>
  notice: {
    content: string
    title: string
    overdueTime: number
  } | null
}

export const fetchBaseData = async () => {
  const url = '/public/getBaseData'
  return await axiosClient.get<ApiResult<CenterData>>(url)
}

export const useBaseData = () => {
  const dispatch = useDispatch()
  const { currentDuty } = useSelector((state: any) => state.center) as CenterState
  useEffect(() => {
    if (currentDuty === null) {
      console.info('fetchBaseData:useBaseData')
      dispatch(fetchCurrentBaseDataThunk())
    }
  }, [])
  return [currentDuty as Duty | null]
}
