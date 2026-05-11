import { type SyntheticEvent } from 'react'
import styles from '../../../styles/post-page.module.css'

interface EditPostFormProps {
  isOpen: boolean
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void
  onCancel: () => void
}

export default function EditPostForm({
  isOpen,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}: EditPostFormProps) {
  if (!isOpen) return null

  return (
    <form className={styles.commentForm} onSubmit={onSubmit}>
      <h3 className={styles.commentFormTitle}>Edit post</h3>
      <label className={styles.commentField}>
        <span className={styles.meta}>Title</span>
        <input
          className={styles.commentInput}
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          required
        />
      </label>
      <label className={styles.commentField}>
        <span className={styles.meta}>Content</span>
        <textarea
          className={styles.commentTextarea}
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          required
        />
      </label>
      <div className={styles.commentFormActions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </div>
    </form>
  )
}
