import type { Post } from "../types/postType"
import apiFetch from './api'

export async function fetchPost(id: string): Promise<Post | null> {
  try {
    const res = await apiFetch(`/posts/${id}`)
    if (!res.ok) return null
    const data = await res.json()
    if (data && typeof data === 'object' && 'id' in data) {
      return data as Post
    }
    return null
  } catch (error) {
    console.error('Failed to fetch post:', error)
    return null
  }
}