import type { Post } from "../types/postType"

interface PostsListResponse {
  items: Post[]
  page: number
  pageSize: number
  totalCount: number
  currentCount: number
  totalPages: number
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('http://localhost:5267/api/posts')
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
  }
  const data: PostsListResponse = await res.json()
  return data.items ?? []
}