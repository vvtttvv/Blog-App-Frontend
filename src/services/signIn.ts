import type { User } from '../types/userType'

export interface SignInRequest {
  userName: string
  password: string
}

interface AuthResponse {
  user: User
  token?: string | null
}

export async function signIn(request: SignInRequest): Promise<User | null> {
  try {
    const res = await fetch('http://localhost:5267/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request),
    })

    if (!res.ok) return null

    const data = await res.json()
    if (data && typeof data === 'object' && 'user' in data) {
      const response = data as AuthResponse
      return response.user
    }
    if (data && typeof data === 'object' && 'id' in data) return data as User

    return null
  } catch (error) {
    console.error('Failed to sign in:', error)
    return null
  }
}
