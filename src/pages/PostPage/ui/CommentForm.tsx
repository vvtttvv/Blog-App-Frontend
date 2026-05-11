import styles from '../../../styles/post-page.module.css'

interface CommentFormProps {
  isOpen: boolean
  title: string
  value: string
  error: string | null
  submitting: boolean
  onChange: (value: string) => void
  onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void
  onCancel: () => void
}

export default function CommentForm({
  isOpen,
  title,
  value,
  error,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}: CommentFormProps) {
  if (!isOpen) return null

  return (
    <form className={styles.commentForm} onSubmit={onSubmit}>
      <h3 className={styles.commentFormTitle}>{title}</h3>
      <label className={styles.commentField}>
        <span className={styles.meta}>Comment text</span>
        <textarea
          className={styles.commentTextarea}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
        />
      </label>
      {error && <div className={styles.commentError}>{error}</div>}
      <div className={styles.commentFormActions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton} disabled={submitting}>
          {submitting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
}
