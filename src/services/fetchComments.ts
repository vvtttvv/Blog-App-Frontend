import type { Comment } from "../types/commentType"

function normalizeCommentsResponse(data: unknown): Comment[] {
  if (Array.isArray(data)) return data as Comment[]
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>
    if (Array.isArray(record.data)) return record.data as Comment[]
    if (Array.isArray(record.items)) return record.items as Comment[]
    if (Array.isArray(record.comments)) return record.comments as Comment[]
  }
  return []
}

async function tryFetch(url: string): Promise<Comment[] | null> {
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return normalizeCommentsResponse(data)
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const first = await tryFetch(`http://localhost:5267/api/posts/${postId}/with-comments`)
  if (first) return first

  return []
}