import axiosClient from '../axiosClient'
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

export const fetchTicketList = async (page: number) => {
  const url = '/api/fetchTicketList'
  const result = await axiosClient.post<Ticket[]>(url, { page })
  return result
}
export function useTicketList() {
  return usePageRequest<Ticket>(fetchTicketList)
}

export interface AddTicketParams {
  title: string
  type: string
  content: string
  contactType: Ticket['contactType']
  toID: number
}
export const addTicket = async (form: AddTicketParams) => {
  const url = '/api/addTicket'
  const result = await axiosClient.post(url, form)
  return result
}

export const readTicket = async (id: number) => {
  const url = '/api/readTicket'
  const result = await axiosClient.post(url, { id })
  return result
}
