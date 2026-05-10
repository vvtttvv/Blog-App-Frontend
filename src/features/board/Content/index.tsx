import styles from './styles.module.css'
import usePosts from '../hooks/usePosts'

const Content = () => {
  const { posts, loading, error } = usePosts()

  if (loading) return <div className={styles.list}>Loading posts…</div>
  if (error) return <div className={styles.list}>Error: {error}</div>
  if (!posts || posts.length === 0) return <div className={styles.list}>No posts.</div>

  return (
    <div className={styles.list}>
      {posts.map((p) => (
        <article key={p.id} className={styles.card}>
          <h3 className={styles.title}>{p.title}</h3>
          <p className={styles.excerpt}>{p.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

export default Content
