import type { Comment } from "../types/commentType"
import type { Post } from "../types/postType"
import apiFetch from './api'

interface PostWithCommentsResponse {
  post: Post
  comments: Comment[]
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  try {
    const res = await apiFetch(`/posts/${postId}/with-comments`)
    if (!res.ok) return []
    const data: PostWithCommentsResponse = await res.json()
    return data.comments ?? []
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    return []
  }
}