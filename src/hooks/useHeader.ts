import { useEffect, useState } from 'react'

export default function useHeader() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggle = () => setIsDark((value) => !value)

  return { isDark, toggle }
}