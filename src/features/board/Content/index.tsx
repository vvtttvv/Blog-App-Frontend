import styles from './styles.module.css'

const posts = [
  { id: 1, title: 'First post', excerpt: 'This is the first post excerpt.' },
  { id: 2, title: 'Another post', excerpt: 'Short summary of the second post.' },
  { id: 3, title: 'Third post', excerpt: 'Notes and thoughts.' },
]

const Content = () => {
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
