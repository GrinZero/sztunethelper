import axiosClient from '@renderer/api/axiosClient'

export const closeTicket = async (ticketId: number, rate: number) => {
  const url = `/api/closeTicket`
  const result = await axiosClient.post(url, { id: ticketId, rate })
  return result
}

export const deleteTicket = async (ticketId: number) => {
  const url = `/api/deleteTicket`
  const result = await axiosClient.post(url, { id: ticketId })
  return result
}
