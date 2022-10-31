import { useEffect, useState } from 'react'

export type ThemeName = 'light' | 'dark'

interface MediaMatches {
  matches: boolean
}

function useWindowTheme() {
  const [themeName, setThemeName] = useState<ThemeName>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  useEffect(() => {
    const handleChange = (event: MediaMatches) => {
      setThemeName(event.matches ? 'dark' : 'light')
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange)
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange)
    }
  }, [])
  return [themeName]
}

export { useWindowTheme }
