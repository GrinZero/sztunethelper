import type { Job } from 'node-schedule'

interface TaskStore {
  hosts: {
    [key: string]: Job
  }
}

const taskStore: TaskStore = {
  hosts: {}
}

export default taskStore
export * from './updateRemoteHost'
export { default as updateRemoteHostTask } from './updateRemoteHost'
