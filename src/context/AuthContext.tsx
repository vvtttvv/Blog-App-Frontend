import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { clearTokens } from '../services/api'
import type { User } from '../types/userType'

interface AuthContextValue {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'blogapp_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setUserState(JSON.parse(raw) as User)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized && !user) {
      clearTokens()
    }
  }, [user, initialized])

  const setUser = (next: User | null) => {
    setUserState(next)
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, setUser, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}