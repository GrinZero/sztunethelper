import axiosClient from '@renderer/api/axiosClient'

export const closeTicket = async (ticketId: number) => {
  const url = `/api/closeTicket`
  const result = await axiosClient.post(url, { id: ticketId })
  return result
}

export const deleteTicket = async (ticketId: number) => {
  const url = `/api/deleteTicket`
  const result = await axiosClient.post(url, { id: ticketId })
  return result
}
