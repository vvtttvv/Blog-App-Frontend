import type { Post } from '../types/postType'

export interface CreatePostRequest {
  title: string
  description?: string
  userId: string
}

export async function createPost(request: CreatePostRequest): Promise<Post | null> {
  try {
    const res = await fetch('http://localhost:5267/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!res.ok) return null

    const data = await res.json()
    if (data && typeof data === 'object' && 'id' in data) {
      return data as Post
    }

    return null
  } catch (error) {
    console.error('Failed to create post:', error)
    return null
  }
}