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

export interface TicketInfo extends Omit<TicketContent, 'type'> {
  type: 'text' | 'image' | 'file' | 'time'
}

export const useTicketInfos = () => {
  return usePageRequest<Partial<TicketInfo>, 'single'>(fetchTicketInfos, {
    pageSize: 20,
    autoInit: false,
    listType: 'single',
    onBeforeSetList: (prev, data) => {
      if (!prev) return data
      // 将两个数字拼接后，遍历数组，如果相邻两个消息的createTime相差超过5分钟，则插入一个type=time的消息
      const newData = [...(prev as Partial<TicketInfo>[]), ...data].reduce(
        (acc, cur, index, arr) => {
          if (index === 0) return [cur]
          const prev = arr[index - 1]
          if (
            cur.createTime &&
            prev.createTime &&
            cur.type !== 'time' &&
            prev.type !== 'time' &&
            prev.createTime - cur.createTime > 5 * 60 * 1000
          ) {
            acc.push({
              type: 'time',
              createTime: prev.createTime,
              id: Date.now() + ~~(Math.random() * 1000),
              ticketID: cur.ticketID,
              content: '',
              status: 0
            })
          }
          acc.push(cur)
          return acc
        },
        [] as Partial<TicketInfo>[]
      )
      return newData
    }
  })
}
