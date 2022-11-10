const { sendMessage } = window.bridge

export interface StoreRequest<SResult> {
  value: Promise<SResult>
  resolve: (value: SResult) => void
  reject: (reason?: any) => void
}

export class ApiClient<SResult> {
  requestStore: { [x: string]: StoreRequest<SResult> } = {}

  constructor() {
    window.bridge.on('api', ({ result, id }: { id: string; result: SResult }) => {
      const request = this.requestStore[id]
      if (!request) {
        throw new Error('Cannot found request')
      }
      // default structure of result {code: number, data: unknown}
      if ((result as { code: number })?.code !== undefined) {
        try {
          if ((result as { code: number }).code === 200) {
            request.resolve(result)
          } else {
            request.reject(result)
          }
        } catch (error) {
          request.reject(result)
        }
        return
      }

      // default structure of result any
      request.resolve(result)
    })
  }

  send<T = SResult>(name: string, payload?: unknown, timeout = 30000) {
    const id = `${name}${Date.now()}`
    let resolveOut = null as unknown as StoreRequest<SResult>['resolve']
    let rejectOut = null as unknown as StoreRequest<SResult>['reject']
    let timeID: NodeJS.Timeout
    this.requestStore[id] = {
      value: new Promise((resolve, reject) => {
        resolveOut = resolve
        rejectOut = reject
        timeID = setTimeout(() => {
          this.requestStore[id].reject('request timeout')
        }, timeout)
        sendMessage('api', { name, payload, id })
      }),
      resolve: (...rest) => {
        clearTimeout(timeID)
        resolveOut(...rest)
      },
      reject: rejectOut
    }
    return this.requestStore[id].value as unknown as Promise<T>
  }
}

import type { ApiResult } from './type'

const apiClient = new ApiClient<ApiResult<unknown>>()

window.storage = {
  async set(key: string | Record<string, unknown>, value?: unknown) {
    return apiClient.send('storage.set', { key, value })
  },
  async get<T>(key: string) {
    return apiClient.send<T>('storage.get', { key })
  },
  async has(key: string) {
    return apiClient.send('storage.has', { key })
  },
  async delete(key: string) {
    return apiClient.send('storage.delete', { key })
  },
  async store() {
    return apiClient.send('storage.store')
  }
}

export default apiClient
