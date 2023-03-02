import { scheduleJob } from 'node-schedule'
import { noticeService } from '../helper'

const task = async () => {
  const randomSec = Math.floor(Math.random() * 60)
  const rule = `${randomSec} */5 * * * *`
  console.info('scheduleJob Running! It is noticeService:rule【', rule, '】')

  noticeService()
  return scheduleJob(rule, noticeService)
}

export default task
