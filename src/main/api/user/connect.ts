import apiStore from '../apiStore'

import { connect } from '../../sdk'
import type { Account } from '../../sdk'

apiStore.add(
  'connect',
  async ({
    username,
    password
  }: Account): Promise<{
    code: number
    msg: string
  }> => {
    const res = await connect({ username, password })
    return res
  }
)
