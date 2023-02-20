import axiosClient from '@renderer/api/axiosClient'
import { usePageRequest } from '@renderer/hooks'

export interface TicketContent {
  id: number
  ticketID: string | number
  content: string
  type: 'text' | 'image' | 'file'
  status: number
  createTime: number
  updateTime: number
  sender: string
}

export const fetchTicketInfos = async (page: number, id: number) => {
  const url = `/api/fetchTicketInfos`
  const result = await axiosClient.post<TicketContent[]>(url, { id, page })
  return result
}

export const useTicketInfos = () => {
  return usePageRequest<Partial<TicketContent>, 'single'>(fetchTicketInfos, {
    pageSize: 20,
    autoInit: false,
    listType: 'single',
    onBeforeSetList: (list) => {
      return list
    }
  })
}
