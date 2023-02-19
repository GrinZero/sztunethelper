import axiosClient from '@renderer/api/axiosClient'

export const readTicket = async (id: number) => {
  const url = '/api/readTicket'
  const result = await axiosClient.post(url, { id })
  return result
}
