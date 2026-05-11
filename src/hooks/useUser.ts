import { useEffect, useState } from 'react'
import { fetchUser } from '../services/fetchUser'
import type { User } from '../types/userType'

export default function useUser(userId?: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    let active = true

    setLoading(true)
    setError(null)

    fetchUser(userId)
      .then((result) => {
        if (!active) return
        setUser(result)
        if (!result) setError('User not found')
      })
      .catch((err) => {
        if (!active) return
        setError(err instanceof Error ? err.message : String(err))
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [userId])

  return { user, loading, error }
}
