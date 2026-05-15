import type { Comment } from '../types/commentType'
import apiFetch from './api'

export interface CreateCommentRequest {
  description: string
  userId: string
  postId: string
  parentId: string | null
}

export async function createComment(request: CreateCommentRequest): Promise<Comment | null> {
  try {
    const res = await apiFetch('/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!res.ok) return null

    const data = await res.json()
    if (data && typeof data === 'object' && 'id' in data) return data as Comment

    return null
  } catch (error) {
    console.error('Failed to create comment:', error)
    return null
  }
}