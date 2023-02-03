/**
 * format time to 【1d | 2h | 3m or s】
 * @date 2023-02-02
 * @param {Date|number} time
 * @returns {string}
 */
export const formatUsefulTime = (time: Date | number) => {
  const origin = time instanceof Date ? time.getTime() : time
  const nowTimestamp = Date.now()
  const day = (nowTimestamp - origin) / 86400000
  const showTime = (() => {
    const hour = (nowTimestamp - origin) / 3600000
    if (day <= 1) {
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
      return `${Math.floor(day)}d ${Math.floor((day - Math.floor(day)) * 24)}h`
    } else if (day >= 7) {
      return new Date(origin).format('yyyy-MM-dd hh:mm')
    }
    return ''
  })()

  return showTime
}

export const getDuration = (startTime: number, endTime = Date.now()) => {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  const usedTime = end - start
  const days = Math.floor(usedTime / (24 * 3600 * 1000))
  const leave1 = usedTime % (24 * 3600 * 1000)
  const hours = Math.floor(leave1 / (3600 * 1000))
  const leave2 = leave1 % (3600 * 1000)
  const minutes = Math.floor(leave2 / (60 * 1000))
  const leave3 = leave2 % (60 * 1000)
  const seconds = Math.round(leave3 / 1000)
  const inline =
    days > 0
      ? `${days}d ${hours}h ${minutes}m`
      : hours > 0
      ? `${hours}h ${minutes}m ${seconds}s`
      : `${minutes}m ${seconds}s`
  return seconds === 0 ? '<1s' : inline
}
