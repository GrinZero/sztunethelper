import apiClient from '../apiClient'
import type { ApiResult } from '../type'

import type { StatusIconProps } from '@renderer/components'

export interface NetTask {
  id: number | string
  title: string
  args: string[]
  command: string
  type: StatusIconProps['type']
  isDynamic?: boolean
}

async function getNetTasks() {
  return apiClient.send<ApiResult<NetTask[]>>('getNetTasks')
}

async function runNetTask({ id, data }: { id: number | string; data: any }) {
  return apiClient.send<ApiResult<string>>('runNetTask', { id, data })
}

export { getNetTasks, runNetTask }
