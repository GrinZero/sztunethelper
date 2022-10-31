import { useState, useEffect } from 'react'

const useWindowMaxify = () => {
  const [maxify, setMaxify] = useState(false)
  useEffect(() => {
    const maxifyListener = window.bridge.on('window-maxify', (val: boolean) => {
      setMaxify(val)
    })
    return () => {
      window.bridge.off('window-maxify', maxifyListener)
    }
  })
  return [maxify]
}

export { useWindowMaxify }
