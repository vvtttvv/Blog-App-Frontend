import { useCallback, useEffect, useState } from 'react'
import { fetchPosts } from '../services/fetchPosts'
import type { Post } from '../types/postType'

export default function usePosts() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchPosts()
      setPosts(data)
      setError(null)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      setLoading(true)
      try {
        const data = await fetchPosts()
        if (!mounted) return
        setPosts(data)
        setError(null)
      } catch (err: any) {
        if (!mounted) return
        setError(err?.message ?? 'Failed to load posts')
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [])

  const refresh = async () => {
    await load()
  }

  return { posts, loading, error, refresh }
}