import apiStore, { RequestResult } from '../apiStore'
import db from '../../db'

apiStore.add('fetchHosts', async (): RequestResult => {
  const data = db.get('hosts').value()
  return {
    code: 200,
    data: data ?? []
  }
})
