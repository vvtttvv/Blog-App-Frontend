export interface Post {
  id: number
  title: string
  excerpt?: string
  [key: string]: any
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('http://localhost:5267/api/posts')
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
  }
  const data = await res.json()

  // Normalize common API shapes to an array of posts
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.data)) return data.data
  if (data && Array.isArray(data.items)) return data.items
  if (data && Array.isArray(data.posts)) return data.posts

  // If response is a single object (post), wrap it
  if (data && typeof data === 'object' && data.id) return [data as Post]

  // Fallback: return empty array to avoid runtime errors
  return []
}
