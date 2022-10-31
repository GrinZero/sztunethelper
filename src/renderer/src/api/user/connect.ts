import apiClient from '../apiClient'

const connect = async ({ username, password }: { username: string; password: string }) =>
  apiClient.send('connect', { username, password })

export { connect }
