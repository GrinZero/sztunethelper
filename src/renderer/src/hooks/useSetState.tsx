import { useState } from 'react'

export function useSetState<T>(defaultState: T): [T, (newState: any) => void] {
  const [state, setState] = useState<T>(defaultState)
  const set = (newState: any) => {
    setState((prevState) => ({
      ...prevState,
      ...newState
    }))
  }

  return [state, set]
}
