import { useState } from 'react'

const uuid = () => Math.random().toString(36).slice(2)

export const useUpdateKey = () => {
  const [key, setKey] = useState(uuid())
  const updateKey = () => {
    setKey(uuid())
  }
  return [key, updateKey] as const
}
