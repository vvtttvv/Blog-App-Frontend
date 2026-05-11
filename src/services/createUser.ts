import type { User } from '../types/userType'

export interface CreateUserRequest {
  userName: string
  age: number
  fullName: string
  role: number
}

export async function createUser(request: CreateUserRequest): Promise<User | null> {
  try {
    const res = await fetch('http://localhost:5267/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request),
    })

    if (!res.ok) return null

    const data = await res.json()
    if (data && typeof data === 'object' && 'id' in data) return data as User

    return null
  } catch (error) {
    console.error('Failed to create user:', error)
    return null
  }
}
