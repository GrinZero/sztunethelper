import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchConfig, initAccount } from '@renderer/store'

const { sendMessage } = window.bridge

const useConfig = () => {
  const dispatch = useDispatch()
  const { theme, config } = useSelector((store: any) => store.base)
  useEffect(() => {
    console.info('useConfig:config=>', config)
    if (config === null) {
      dispatch(fetchConfig())
    }
  }, [config])

  useEffect(() => {
    if (config === null) {
      return
    }
    sendMessage('themeChange', theme)
    document.documentElement.setAttribute('theme-mode', theme)
    document.body.setAttribute('arco-theme', theme)
  }, [config, theme])

  useEffect(() => {
    if (config === null) {
      return
    }
    dispatch(initAccount())
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
