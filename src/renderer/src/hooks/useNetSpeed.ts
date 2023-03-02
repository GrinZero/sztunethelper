import { useEffect, useState } from 'react'

export const useNetSpeed = (open: boolean) => {
  const [ping, setPing] = useState(0)
  const [count, setCount] = useState(0)
  const [pingList, setPingList] = useState<number[]>([])
  const [jitter, setJitter] = useState(0)
  const [downlink, setDownlink] = useState(0)
  const [rtt, setRtt] = useState(0)

  useEffect(() => {
    if (!open) return
    const timer = setInterval(() => {
      const connection = (window.navigator as any).connection
      if (connection) {
        setDownlink(connection.downlink)
        setRtt(connection.rtt)
      }

      const img = new Image()
      const startTime = new Date().getTime()

      img.src = `https://www.baidu.com/favicon.ico?d=${startTime}`
      img.onload = () => {
        const endTime = new Date().getTime()
        const delta = endTime - startTime
        if ((count + 1) % 5 === 0) {
          const maxPing = Math.max(delta, ...pingList)
          const minPing = Math.min(delta, ...pingList)
          setJitter(maxPing - minPing)
          setPingList([])
        } else {
          setPingList((lastList) => [...lastList, delta])
        }
        setCount(count + 1)
        setPing(delta)
      }
      img.onerror = (err) => {
        console.error('useSpeed:error', err)
      }
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [count, pingList, open])

  return [ping, jitter, downlink, rtt]
}
