import type { Post } from '../types/postType'

export interface UpdatePostRequest {
  title?: string
  description?: string
  userId?: string
}

import apiFetch from './api'

export async function updatePost(id: string, request: UpdatePostRequest): Promise<Post | null> {
  try {
    const res = await apiFetch(`/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request),
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data && typeof data === 'object' && 'id' in data) return data as Post
    return null
  } catch (err) {
    console.error('Failed to update post:', err)
    return null
  }
}
