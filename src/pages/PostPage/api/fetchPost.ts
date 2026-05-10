import type { Post } from '../types'

function normalizePostResponse(data: unknown): Post | null {
  if (!data) return null
  if (typeof data === 'object' && 'id' in data) return data as Post
  if (typeof data === 'object' && data && 'post' in data) {
    const nested = (data as { post?: unknown }).post
    if (nested && typeof nested === 'object' && 'id' in nested) return nested as Post
  }
  return null
}

export async function fetchPost(id: string): Promise<Post | null> {
  const res = await fetch(`http://localhost:5267/api/posts/${id}`)
  if (!res.ok) return null
  const data = await res.json()
  return normalizePostResponse(data)
}
