import type { Job } from 'node-schedule'

interface TaskStore {
  hosts: {
    [key: string]: Job
  }
  connect: Job | null
}

const taskStore: TaskStore = {
  hosts: {},
  connect: null
}

export default taskStore

export * from './updateRemoteHost'
export { default as updateRemoteHostTask } from './updateRemoteHost'
export { default as neverOffline } from './neverOffline'
