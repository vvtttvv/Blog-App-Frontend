import { useCallback, useEffect, useState } from 'react'
import { fetchPost } from '../services/fetchPost'
import type { Post } from '../types/postType'

export default function usePost(id?: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshPost = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)

    try {
      const result = await fetchPost(id)
      setPost(result)
      if (!result) setError('Post not found')
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    refreshPost()
  }, [refreshPost])

  return { post, loading, error, refreshPost }
}