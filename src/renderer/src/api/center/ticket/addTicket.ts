import axiosClient from '@renderer/api/axiosClient'
import { Ticket } from './ticketList'

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
