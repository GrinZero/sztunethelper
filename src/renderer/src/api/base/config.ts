import apiClient from '../apiClient'

import type { BaseConfig } from '../../store'

const setBaseConfig = async (props: BaseConfig | null) => {
  const result = await apiClient.send('setBaseConfig', props)
  return result
}

export { setBaseConfig }
