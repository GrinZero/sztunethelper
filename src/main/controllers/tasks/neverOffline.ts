import taskStore, { neverOffline } from '../../tasks'

const neverOfflineTask = async () => {
  console.info('neverOfflineTask: start')
  const job = taskStore.connect
  if (job) {
    job.cancel()
  }
  const instance = await neverOffline()
  if (instance) {
    taskStore.connect = instance
  }
  console.info('neverOfflineTask: end')
}

export default neverOfflineTask
