import type { User } from '../types/userType'
import apiFetch, { setTokens } from './api'

export interface SignInRequest {
  userName: string
  password: string
}

interface AuthResponse {
  user: User
  accessToken?: string
  refreshToken?: string
}

export async function signIn(request: SignInRequest): Promise<User | null> {
  try {
    const res = await apiFetch('/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!res.ok) return null

    const data = await res.json()
    const user = data?.user ?? data
    const access = data?.accessToken ?? data?.AccessToken
    const refresh = data?.refreshToken ?? data?.RefreshToken

    if (access && refresh) setTokens(access, refresh)

    if (user && typeof user === 'object' && 'id' in user) return user as User
    return null
  } catch (error) {
    console.error('Failed to sign in:', error)
    return null
  }
}
