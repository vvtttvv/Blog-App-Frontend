export async function deleteComment(id: string): Promise<boolean> {
  try {
    const res = await fetch(`http://localhost:5267/api/comments/${id}`, { method: 'DELETE' })
    return res.ok
  } catch (err) {
    console.error('Failed to delete comment:', err)
    return false
  }
}
