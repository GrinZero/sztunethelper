import axiosClient from '@renderer/api/axiosClient'

export const fetchTicketInfos = async (id: number, page: number) => {
  const url = `/api/fetchTicketInfos`
  const result = await axiosClient.post(url, { id, page })
  return result
}
