import taskStore, { noticeService } from '../../tasks'

const noticeServiceTask = async () => {
  console.info('noticeService: start')
  const job = taskStore.connect
  if (job) {
    job.cancel()
  }
  const instance = await noticeService()
  if (instance) {
    taskStore.connect = instance
  }
  console.info('noticeService: end')
}

export default noticeServiceTask
