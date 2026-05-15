import type { Comment } from '../types/commentType'
import apiFetch from './api'

export interface UpdateCommentRequest {
  description?: string
  userId?: string
  postId?: string
  parentId?: string | null
}

export async function updateComment(id: string, request: UpdateCommentRequest): Promise<Comment | null> {
  try {
    const res = await apiFetch(`/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request),
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data && typeof data === 'object' && 'id' in data) return data as Comment
    return null
  } catch (err) {
    console.error('Failed to update comment:', err)
    return null
  }
}
