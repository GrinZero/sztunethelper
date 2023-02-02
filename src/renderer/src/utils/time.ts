const formatUsefulTime = (time: Date | number) => {
  const origin = time instanceof Date ? time.getTime() : time
  const nowTimestamp = Date.now()
  const day = (nowTimestamp - origin) / 86400000
  const showTime = (() => {
    if (day <= 1) {
      const hour = (nowTimestamp - origin) / 3600000
      if (hour <= 1) {
        const minute = Math.floor((nowTimestamp - origin) / 60000)
        if (minute < 1) {
          return 'Just now'
        } else {
          return minute + 'm'
        }
      } else if (hour < 24) {
        return Math.floor(hour) + 'h'
      }
    } else if (day < 7) {
      return Math.floor(day) + 'd'
    } else if (day >= 7) {
      return new Date(origin).format('yyyy-MM-dd hh:mm')
    }
    return ''
  })()

  return showTime
}

export { formatUsefulTime }
