export type RequestResult<T = unknown> = Promise<T>

export type RulerService<T = unknown, P = unknown> = (
  payload: P,
  ...rest: unknown[]
) => RequestResult<T>

export interface StoreInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: RulerService<any, any>
}

export type ApiStoreInstance = {
  store: StoreInterface
  add: <TResult, PPayload>(name: string, rule: RulerService<TResult, PPayload>) => ApiStoreInstance
  use: <TResult, PPayload>(name: string, payload?: PPayload) => RequestResult<TResult>
}

export class ApiStore implements ApiStoreInstance {
  store: StoreInterface = {}

  constructor() {
    return this
  }

  add<TRule, PRule>(name: string, rule: RulerService<TRule, PRule>): ApiStore {
    this.store[name] = rule
    return this
  }

  async use<TResult, PPayload = unknown>(name: string, payload?: PPayload): RequestResult<TResult> {
    const ruler = this.store[name]
    if (!ruler) {
      throw new Error(`without rules ${name}`)
    }
    return await ruler(payload)
  }
}

const apiStore = new ApiStore()

export default apiStore
