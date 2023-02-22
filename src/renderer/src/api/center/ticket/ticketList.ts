import axiosClient from '../../axiosClient'
import { usePageRequest } from '@renderer/hooks'

export enum TicketStatus {
  open,
  close,
  delete
}
export interface Ticket {
  id: number
  adminName: string
  from: string
  to: string
  title: string
  type: '网络问题'
  status: TicketStatus
  rate: number
  read: boolean
  createTime: number
  updateTime: number
  contactType: 'socket' | 'mail' | 'image' | 'other'
}

export interface TicketListItem extends Ticket {
  other: string
}

export const fetchTicketList = async (page: number) => {
  const url = '/api/fetchTicketList'
  const result = await axiosClient.post<TicketListItem[]>(url, { page })
  return result
}
export function useTicketList() {
  return usePageRequest<TicketListItem>(fetchTicketList)
}
