import { useState, useEffect } from 'react'
import type { DataStatus } from '@renderer/types'
import { useSetState } from './useSetState'

export interface PageState {
  page: number
  status: DataStatus
  pageSize: number
}

export function usePageRequest<T>(
  fetch: (page: number) => Promise<{ data: T[] }>,
  pageSize = 10
): [T[][], () => Promise<void>, PageState] {
  const [list, setList] = useState<T[][]>([])
  const [state, setState] = useSetState<PageState>({
    page: -1,
    status: 'empty',
    pageSize
  })

  const next = async () => {
    if (['loading', 'done', 'error'].includes(state.status)) {
      return
    }

    const page = state.page + 1
    setState({ page, status: 'loading' })
    const result = await fetch(page).catch((err) => {
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

    setList((prevList) => [...prevList, result.data])
  }
  useEffect(() => {
    next()
  }, [])

  return [list, next, state]
}
