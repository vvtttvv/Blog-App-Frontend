import type { User } from '../types/userType'

export async function fetchUserByUserName(userName: string): Promise<User | null> {
  try {
    const res = await fetch(`http://localhost:5267/api/users/by-username/${encodeURIComponent(userName)}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data && typeof data === 'object' && 'id' in data) return data as User
    return null
  } catch (error) {
    console.error('Failed to fetch user by userName:', error)
    return null
  }
}
