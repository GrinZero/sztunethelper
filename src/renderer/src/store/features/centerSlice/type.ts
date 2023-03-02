import type { Duty, TicketListItem } from '@renderer/api'

export interface CenterState {
  currentDuty: Duty | null | 'loading'
  ticketList: null | TicketListItem[][]
  // bannerList: Array<{ id: number; title: string; url: string }>
  // notice: {
  //   content: string
  //   title: string
  //   overdueTime: number
  // } | null
}

export interface CenterReducer {
  setCurrentDuty(state: CenterState, action: { payload: Duty }): void
  setTicketList(state: CenterState, action: { payload: null | TicketListItem[][] }): void
  [key: string]: any
}
