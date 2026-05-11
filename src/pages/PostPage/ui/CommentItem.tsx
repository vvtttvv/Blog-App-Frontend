import { Link } from 'react-router-dom'
import styles from '../../../styles/post-page.module.css'
import type { Comment } from '../../../types/commentType'

interface CommentItemProps {
  comment: Comment
  isEditing: boolean
  editingText: string
  canEdit: boolean
  onEditingTextChange: (value: string) => void
  onReply: (commentId: string, userName: string) => void
  onStartEdit: (commentId: string, text: string) => void
  onCancelEdit: () => void
  onSaveEdit: (comment: Comment) => void
  onDelete: (commentId: string) => void
}

export default function CommentItem({
  comment,
  isEditing,
  editingText,
  canEdit,
  onEditingTextChange,
  onReply,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: CommentItemProps) {
  return (
    <article className={styles.commentCard}>
      <Link to={`/users/${comment.userId}`} className={styles.commentAuthorLink}>
        <div className={styles.commentAuthor}>{comment.userName || 'Anonymous'}</div>
      </Link>
      {comment.parentId && <div className={styles.commentReplyMeta}>Reply to comment #{comment.parentId}</div>}
      {isEditing ? (
        <div className={styles.commentEditInline}>
          <textarea
            className={styles.commentTextarea}
            value={editingText}
            onChange={(event) => onEditingTextChange(event.target.value)}
          />
          <div className={styles.commentFormActions}>
            <button type="button" className={styles.cancelButton} onClick={onCancelEdit}>
              Cancel
            </button>
            <button type="button" className={styles.submitButton} onClick={() => onSaveEdit(comment)}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className={styles.commentBody}>{comment.description || ''}</p>
          <div className={styles.commentActions}>
            <button
              type="button"
              className={styles.replyButton}
              onClick={() => onReply(comment.id, comment.userName || 'Anonymous')}
            >
              Reply
            </button>
            {canEdit && (
              <>
                <button
                  type="button"
                  className={styles.replyButton}
                  onClick={() => onStartEdit(comment.id, comment.description || '')}
                >
                  Edit
                </button>
                <button type="button" className={styles.deleteButton} onClick={() => onDelete(comment.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </>
      )}
    </article>
  )
}
