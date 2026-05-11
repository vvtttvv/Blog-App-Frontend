import type { User } from "../types/userType"

export async function fetchUser(userId: string): Promise<User | null> {
  try {
    const res = await fetch(`http://localhost:5267/api/users/${userId}`)
    if (!res.ok) return null
    const data = await res.json()
    if (data && typeof data === 'object' && 'id' in data) {
      return data as User
    }
    return null
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
}
