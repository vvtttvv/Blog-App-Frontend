import { useEffect, useState } from 'react'
import { fetchComments } from '../services/fetchComments'
import type { Comment } from '../types/commentType'

export default function useComments(postId?: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!postId) return
    let active = true

    setLoading(true)
    setError(null)

    fetchComments(postId)
      .then((result) => {
        if (!active) return
        setComments(result)
      })
      .catch((err) => {
        if (!active) return
        setError(err instanceof Error ? err.message : String(err))
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [postId])

  return { comments, loading, error }
}