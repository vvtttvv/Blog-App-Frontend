import apiFetch from './api'

export async function deletePost(id: string, userId?: string): Promise<boolean> {
  try {
    const res = await apiFetch(`/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: userId ? JSON.stringify({ userId }) : undefined,
    })
    return res.ok
  } catch (err) {
    console.error('Failed to delete post:', err)
    return false
  }
}
