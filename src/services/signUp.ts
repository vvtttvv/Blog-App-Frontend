import type { User } from '../types/userType'

export interface SignUpRequest {
  userName: string
  fullName: string
  age: number
  role: number
  password: string
}

interface AuthResponse {
  user: User
  token?: string | null
}

export async function signUp(request: SignUpRequest): Promise<User | null> {
  try {
    const res = await fetch('http://localhost:5267/api/auth/signup', {
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
    console.error('Failed to sign up:', error)
    return null
  }
}
