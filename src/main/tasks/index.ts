import type { Job } from 'node-schedule'

interface TaskStore {
  hosts: {
    [key: string]: Job
  }
  connect: Job | null
  notice: Job | null
}

const taskStore: TaskStore = {
  hosts: {},
  connect: null,
  notice: null
}

export default taskStore

export * from './updateRemoteHost'
export { default as updateRemoteHostTask } from './updateRemoteHost'
export { default as neverOffline } from './neverOffline'
export { default as noticeService } from './noticeService'
