import apiFetch from './api'

export async function deleteComment(id: string): Promise<boolean> {
  try {
    const res = await apiFetch(`/comments/${id}`, { method: 'DELETE' })
    return res.ok
  } catch (err) {
    console.error('Failed to delete comment:', err)
    return false
  }
}
