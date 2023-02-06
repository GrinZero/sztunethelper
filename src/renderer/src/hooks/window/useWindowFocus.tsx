import { useState, useEffect } from 'react'

const useWindowFocus = () => {
  const [focus, setFocus] = useState(true)
  useEffect(() => {
    const focusListener = window.bridge.on('window-focus', () => setFocus(true))
    const blurListener = window.bridge.on('window-blur', () => setFocus(false))
    return () => {
      window.bridge.off('window-focus', focusListener)
      window.bridge.off('window-blur', blurListener)
    }
  })
  return [focus]
}

export { useWindowFocus }
