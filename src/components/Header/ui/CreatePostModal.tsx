import { useState, type SyntheticEvent } from 'react'
import styles from '../../../styles/header.module.css'
import { createPost } from '../../../services/createPost'

interface CreatePostModalProps {
  onClose: () => void
  onCreated: (postId?: string) => void
  userId: string
}

export default function CreatePostModal({ onClose, onCreated, userId }: CreatePostModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
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
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
            />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.modalActions}>
            <button className={styles.secondaryButton} type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button className={styles.primaryButton} type="submit" disabled={saving}>
              {saving ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
