import { Link } from 'react-router-dom'
import styles from '../../styles/board.module.css'
import usePosts from '../../hooks/usePosts'

export default function Content() {
  const { posts, loading, error } = usePosts()

  if (loading) return <div className={styles.list}>Loading posts…</div>
  if (error) return <div className={styles.list}>Error: {error}</div>
  if (!posts || posts.length === 0) return <div className={styles.list}>No posts.</div>

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <article key={post.id} className={styles.card}>
          <Link to={`/posts/${post.id}`} className={styles.link}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
          </Link>
        </article>
      ))}
    </div>
  )
}