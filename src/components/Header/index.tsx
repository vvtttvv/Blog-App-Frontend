import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/header.module.css'
import useHeader from '../../hooks/useHeader'
import { createPost } from '../../services/createPost'

// Temporary auth stub — replace with real auth context later
function useAuth() {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)
  const login = (id: string, name: string) => setUser({ id, name })
  const logout = () => setUser(null)
  return { user, login, logout }
}

function CreatePostModal({
  onClose,
  onCreated,
  userId,
}: {
  onClose: () => void
  onCreated: (postId?: string) => void
  userId: string
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError(null)

    const created = await createPost({ title, description, userId })

    setSaving(false)

    if (!created) {
      setError('Failed to create post')
      return
    }

    onCreated(created.id)
    onClose()
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Create post</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Title</span>
            <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Content</span>
            <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} rows={6} required />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.modalActions}>
            <button className={styles.secondaryButton} type="button" onClick={onClose} disabled={saving}>Cancel</button>
            <button className={styles.primaryButton} type="submit" disabled={saving}>{saving ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Header() {
  const { isDark, toggle } = useHeader()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const handlePostCreated = (postId?: string) => {
    if (postId) navigate(`/posts/${postId}`)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>My Blog</div>
        <div className={styles.spacer} />
        <div className={styles.controls}>
          {user && (
            <button className={styles.secondaryButton} onClick={() => setIsCreatePostOpen(true)}>
              Add post
            </button>
          )}
          <button className={styles.themeBtn} onClick={toggle}>
            {isDark ? 'Light' : 'Dark'}
          </button>
          {user ? (
            <button className={styles.secondaryButton} onClick={() => navigate(`/users/${user.id}`)}>
              {user.name}
            </button>
          ) : (
            <>
              <button className={styles.secondaryButton} onClick={() => navigate('/signin')}>Sign In</button>
              <button className={styles.primaryButton} onClick={() => navigate('/signup')}>Sign Up</button>
            </>
          )}
        </div>
      </header>
      {isCreatePostOpen && user && (
        <CreatePostModal onClose={() => setIsCreatePostOpen(false)} onCreated={handlePostCreated} userId={user.id} />
      )}
    </>
  )
}