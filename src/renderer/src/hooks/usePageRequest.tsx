import { useState, useEffect, useRef } from 'react'
import type { DataStatus } from '@renderer/types'
import { useSetState } from './useSetState'

export interface PageState {
  status: DataStatus
}

export type PageRequestHookReturn<T> = [
  T[] | null,
  (...rest: any[]) => Promise<void>,
  PageState,
  React.Dispatch<React.SetStateAction<T[]>>,
  () => void,
  React.Dispatch<React.SetStateAction<PageState>>
]

export const usePageRequest = <T, P = 'double'>(
  fetch: (page: number, ...rest: any[]) => Promise<{ data: T[] }>,
  options: {
    pageSize?: number
    autoInit?: boolean
    listType?: 'single' | 'double'
    onBeforeSetList?: (prev: (T | T[])[], data: T[]) => T[]
    defaultList?: (P extends 'double' ? T[] : T)[] | null
  } = {}
): PageRequestHookReturn<P extends 'double' ? T[] : T> => {
  const {
    pageSize = 10,
    autoInit = true,
    listType = 'double',
    defaultList = null,
    onBeforeSetList
  } = options

  const [list, setList] = useState<(P extends 'double' ? T[] : T)[] | null>(defaultList)
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
    if ((!list || list.length === 0) && result.data.length === 0) {
      setState({ status: 'empty' })
      return
    }

    if (result.data.length < pageSize) {
      setState({ status: 'done' })
    } else {
      setState({ status: 'ok' })
    }

    if (listType === 'double') {
      _setList((prevList) => {
        if (!prevList) prevList = []
        const newList = [...prevList, result.data]
        if (onBeforeSetList) {
          return onBeforeSetList(prevList, result.data)
        }
        return newList
      })
    } else {
      _setList((prevList) => {
        if (!prevList) prevList = []
        const newList = [...prevList, ...result.data]
        if (onBeforeSetList) {
          return onBeforeSetList(prevList, result.data)
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

  return [list, next, state, _setList, reset, setState]
}
