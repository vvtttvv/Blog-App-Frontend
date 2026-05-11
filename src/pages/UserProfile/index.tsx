import { Link, useParams } from 'react-router-dom'
import styles from '../../styles/user-profile.module.css'
import useUser from '../../hooks/useUser'

export default function UserProfile() {
  const { id } = useParams()
  const { user, loading, error } = useUser(id)

  if (loading) return <div className={styles.root}>Loading…</div>
  if (error) return <div className={styles.root}>Error: {error}</div>
  if (!user) return <div className={styles.root}>User not found.</div>

  return (
    <div className={styles.root}>
      <Link className={styles.goback} to="/">
        Go Back
      </Link>
      <div className={styles.profile}>
        <div className={styles.profileHeader}>
          <h1 className={styles.userName}>{user.userName}</h1>
          <p className={styles.fullName}>{user.fullName || 'No full name'}</p>
          <p className={styles.age}>{user.age || 'Age not specified'}</p>
        </div>
        <div className={styles.profileMeta}>
          <p className={styles.metaItem}>
            <span className={styles.metaLabel}>Joined:</span>
            {new Date(user.createdAt).toLocaleDateString('ru-RU')}
          </p>
          <p className={styles.metaItem}>
            <span className={styles.metaLabel}>Last updated:</span>
            {new Date(user.updatedAt).toLocaleDateString('ru-RU')}
          </p>
        </div>
      </div>
    </div>
  )
}
