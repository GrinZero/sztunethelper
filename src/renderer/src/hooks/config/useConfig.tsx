import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchConfig, setConfig } from '@renderer/store'

const useConfig = () => {
  const dispatch = useDispatch()
  const { theme, config } = useSelector((store: any) => store.base)
  useEffect(() => {
    if (config === null) {
      dispatch(fetchConfig())
    }
  }, [config])

  //监听Config变化
  useEffect(() => {
    if (!window.bridge) return
    window.bridge.on('baseConfigChange', (data) => {
      dispatch(setConfig(data))
    })
  }, [])

  useEffect(() => {
    window?.bridge?.sendMessage?.('themeChange', theme)
    document.documentElement.setAttribute('theme-mode', theme)
    document.body.setAttribute('arco-theme', theme)
  }, [theme])

  useEffect(() => {
    if (config === null) {
      return
    }
    if (!window.bridge) {
      document.documentElement.setAttribute('platform', 'web')
      return
    }
    const { platform } = window.navigator
    if (platform.includes('Mac') || platform.includes('mac')) {
      document.documentElement.setAttribute('platform', 'mac')
    } else {
      document.documentElement.setAttribute('platform', 'windows')
    }
  }, [config])

  return [config]
}

export { useConfig }
