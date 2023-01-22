import axiosClient from '../axiosClient'
import type { ApiResult } from '../type'

export interface Duty {
  id: string
  name: string
  avatarUrl: string
  desc: string
  contact: string
  rate: number | null
}
export const fetchCurrentDuty = async () => {
  const url = '/public/getDuty'
  return await axiosClient.get<ApiResult<Duty>>(url)
}
