import axiosClient from '../axiosClient'

export interface Ticket {
  id: number
  from: string
  to: string
  title: string
  type: '网络问题'
  status: 0 | 1 | 2
  rate: number
  createTime: number
  updateTime: number
}

export const fetchTicketList = async (page: number) => {
  const url = '/api/fetchTicketList'
  return await axiosClient.post<Ticket[]>(url, { page })
}
