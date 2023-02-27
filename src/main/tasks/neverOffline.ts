import { scheduleJob } from 'node-schedule'
import { connectNet } from '../helper'

const task = async () => {
  const randomMin = Math.floor(Math.random() * 60)
  const randomSec = Math.floor(Math.random() * 60)
  const rule = `${randomSec} ${randomMin} * * * *`
  console.info('scheduleJob Running! It is neverOffline:rule【', rule, '】')

  return scheduleJob(rule, connectNet)
}

export default task
