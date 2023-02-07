import { scheduleJob } from 'node-schedule'
import { connect } from '../sdk'

import store from '../db/store'

const task = async () => {
  const randomMin = Math.floor(Math.random() * 60)
  const randomSec = Math.floor(Math.random() * 60)
  const rule = `${randomSec} ${randomMin} * * * *`
  console.info('scheduleJob Running! It is neverOffline:rule【', rule, '】')

  return scheduleJob(rule, async () => {
    const username = store.get<string>('username') as string
    const password = store.get<string>('password') as string
    if (!username || !password) {
      return
    }
    // connect
    const connectResult = await connect({ username, password })
    if (connectResult.code === 200) {
      return
    } else {
      console.error('connectResult:error', connectResult)
    }
  })
}

export default task
