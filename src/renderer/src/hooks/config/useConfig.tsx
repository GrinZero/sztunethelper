import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchConfig } from '@renderer/store'

const { sendMessage } = window.bridge

const useConfig = () => {
  const dispatch = useDispatch()
  const { theme, config } = useSelector((store: any) => store.base)
  useEffect(() => {
    if (config === null) {
      dispatch(fetchConfig())
    }
  }, [config])

  useEffect(() => {
    sendMessage('themeChange', theme)
    document.documentElement.setAttribute('theme-mode', theme)
    document.body.setAttribute('arco-theme', theme)
  }, [theme])

  useEffect(() => {
    if (config === null) {
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
