import type { Post } from "../types/postType"

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('http://localhost:5267/api/posts')
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
  }
  const data = await res.json()

  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.data)) return data.data
  if (data && Array.isArray(data.items)) return data.items
  if (data && Array.isArray(data.posts)) return data.posts

  if (data && typeof data === 'object' && data.id) return [data as Post]

  return []
}