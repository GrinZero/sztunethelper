import { useState, useEffect, useRef } from 'react'
import type { DataStatus } from '@renderer/types'
import { useSetState } from './useSetState'

export interface PageState {
  status: DataStatus
}

export type PageRequestHookReturn<T> = [
  T[],
  (...rest: any[]) => Promise<void>,
  PageState,
  React.Dispatch<React.SetStateAction<T[]>>,
  () => void
]

export const usePageRequest = <T, P = 'double'>(
  fetch: (page: number, ...rest: any[]) => Promise<{ data: T[] }>,
  options: {
    pageSize?: number
    autoInit?: boolean
    listType?: 'single' | 'double'
    onBeforeSetList?: (list: T[]) => T[]
  } = {}
): PageRequestHookReturn<P extends 'double' ? T[] : T> => {
  const { pageSize = 10, autoInit = true, listType = 'double', onBeforeSetList } = options

  const [list, setList] = useState<(P extends 'double' ? T[] : T)[]>([])
  const [state, setState] = useSetState<PageState>({
    status: 'empty'
  })
  const stateRef = useRef({
    page: -1,
    pageSize
  })

  //FIXME: 我还不会这种泛型
  function _setList(anything: any) {
    setList(anything)
  }

  const next = async (...rest: any[]) => {
    if (['loading', 'done', 'error'].includes(state.status)) {
      return
    }

    const page = stateRef.current.page + 1
    stateRef.current.page = page
    setState({ status: 'loading' })
    const result = await fetch(page, ...rest).catch((err) => {
      console.error('usePageRequest:fetch', err)
      setState({ status: 'error' })
    })
    if (!result) {
      return
    }

    if (result.data.length < pageSize) {
      setState({ status: 'done' })
    } else {
      setState({ status: 'ok' })
    }

    if (listType === 'double') {
      _setList((prevList) => {
        const newList = [...prevList, result.data]
        if (onBeforeSetList) {
          return onBeforeSetList(newList)
        }
        return newList
      })
    } else {
      _setList((prevList) => {
        const newList = [...prevList, ...result.data]
        if (onBeforeSetList) {
          return onBeforeSetList(newList)
        }
        return newList
      })
    }
  }
  useEffect(() => {
    if (autoInit) {
      next()
    }
  }, [fetch])

  const reset = () => {
    state.status = 'empty'
    setState({ status: 'empty' })
    stateRef.current.page = -1
    setList([])
  }

  return [list, next, state, _setList, reset]
}
