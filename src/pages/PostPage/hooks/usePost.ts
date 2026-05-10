import { useEffect, useState } from 'react'
import { fetchPost } from '../api/fetchPost'
import type { Post } from '../types'

export default function usePost(id?: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let active = true

    setLoading(true)
    setError(null)

    fetchPost(id)
      .then((result) => {
        if (!active) return
        setPost(result)
        if (!result) setError('Post not found')
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
  }, [id])

  return { post, loading, error }
}
