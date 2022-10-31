const { sendMessage } = window.bridge

export interface StoreRequestResult<T = unknown> {
  code: number
  data: T
  msg?: unknown
}

export interface StoreRequest {
  value: Promise<StoreRequestResult>
  resolve: (value: StoreRequestResult) => void
  reject: (reason?: any) => void
}

export class ApiClient {
  requestStore: { [x: string]: StoreRequest } = {}

  constructor() {
    window.bridge.on('api', ({ result, id }: { id: string; result: StoreRequestResult }) => {
      const request = this.requestStore[id]
      if (!request) {
        throw new Error('Cannot found request')
      }
      try {
        if (result.code === 200) {
          request.resolve(result)
        } else {
          request.reject(result)
        }
      } catch (error) {
        request.reject(result)
      }
    })
  }

  send<T>(name: string, payload?: unknown, timeout = 30000) {
    const id = `${name}${Date.now()}`
    let resolveOut = null as unknown as StoreRequest['resolve']
    let rejectOut = null as unknown as StoreRequest['reject']
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
    return this.requestStore[id].value as Promise<StoreRequestResult<T>>
  }
}

const apiClient = new ApiClient()
export default apiClient
