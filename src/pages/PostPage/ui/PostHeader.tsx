import styles from '../../../styles/post-page.module.css'

interface PostHeaderProps {
  title: string
  createdAt: string
  canEdit: boolean
  onEdit: () => void
  onDelete: () => void
}

export default function PostHeader({ title, createdAt, canEdit, onEdit, onDelete }: PostHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.meta}>{new Date(createdAt).toLocaleDateString('ru-RU')}</p>
      </div>
      {canEdit && (
        <div className={styles.commentActions}>
          <button type="button" className={styles.replyButton} onClick={onEdit}>
            Edit post
          </button>
          <button type="button" className={styles.deleteButton} onClick={onDelete}>
            Delete post
          </button>
        </div>
      )}
    </div>
  )
}
