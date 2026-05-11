import { useCallback, useEffect, useState } from 'react'
import { fetchComments } from '../services/fetchComments'
import type { Comment } from '../types/commentType'

export default function useComments(postId?: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadComments = useCallback(async () => {
    if (!postId) return

    setLoading(true)
    setError(null)

    try {
      const result = await fetchComments(postId)
      setComments(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    if (!postId) return
    void loadComments()
  }, [postId, loadComments])

  return { comments, loading, error, refreshComments: loadComments }
}