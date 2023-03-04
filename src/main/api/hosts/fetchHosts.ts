import apiStore, { RequestResult } from '../apiStore'
import { store } from '../../db'

apiStore.add('fetchHosts', async (): RequestResult => {
  const data = store.get('hosts')
  return {
    code: 200,
    data: data ?? []
  }
})
