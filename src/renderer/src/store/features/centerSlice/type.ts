import type { Duty } from '@renderer/api'

export interface CenterState {
  currentDuty: Duty | null | 'loading'
}

export interface CenterReducer {
  setCurrentDuty(state: CenterState, action: { payload: Duty }): void
  [key: string]: any
}
