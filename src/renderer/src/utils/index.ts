const debounce = function (fn, wait: number) {
  let timeID: NodeJS.Timeout | null = null
  return (...rest: any[]) => {
    if (timeID) {
      clearTimeout(timeID)
    }
    timeID = setTimeout(fn.bind({}, ...rest), wait)
  }
}

export { debounce }
export { default as getHostsContent } from './getHostsContent'
export * from './time'
export * from './test'
export * from './json'
export * from './history'
