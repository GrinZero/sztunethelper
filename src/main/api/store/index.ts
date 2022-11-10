import apiStore from '../apiStore'

import store from '../../db/store'

apiStore.add('storage.get', async ({ key }: { key: string }) => {
  return store.get(key, null)
})

apiStore.add(
  'storage.set',
  async ({ key, value }: { key: string | Record<string, unknown>; value?: unknown }) => {
    if (typeof key === 'string') {
      return store.set(key, value)
    } else {
      return store.set(key)
    }
  }
)

apiStore.add('storage.has', async ({ key }: { key: string }) => {
  return store.has(key)
})

apiStore.add('storage.delete', async ({ key }: { key: string }) => {
  return store.delete(key)
})

apiStore.add('storage.store', async () => {
  return store.store
})

export default store
