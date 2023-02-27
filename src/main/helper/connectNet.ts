import store from '../db/store'
import { connect } from '../sdk'

export const connectNet = async () => {
  const username = store.get<string>('username') as string
  const password = store.get<string>('password') as string
  if (!username || !password) {
    return
  }

  const connectResult = await connect({ username, password })
  if (connectResult.code === 200) {
    return
  } else {
    throw connectResult
  }
}
