import apiStore from '../apiStore'

import store from '../../db/store'

apiStore.add('storage.get', async ({ key, value = null }: { key: string; value: any }) => {
  return store.get(key, value)
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

apiStore.add('storage.delete', async ({ key }: { key: any }) => {
  return store.delete(key)
})

apiStore.add('storage.store', async () => {
  return store.store
})

export default store
