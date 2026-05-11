import { Link, useNavigate, useParams } from 'react-router-dom'
import { type SyntheticEvent, useMemo, useState } from 'react'
import styles from '../../styles/post-page.module.css'
import usePost from '../../hooks/usePost'
import useComments from '../../hooks/useComments'
import { createComment } from '../../services/createComment'
import { updatePost } from '../../services/updatePost'
import { deletePost } from '../../services/deletePost'
import { updateComment as apiUpdateComment } from '../../services/updateComment'
import { deleteComment as apiDeleteComment } from '../../services/deleteComment'
import PostHeader from './ui/PostHeader'
import CommentForm from './ui/CommentForm'
import EditPostForm from './ui/EditPostForm'
import CommentItem from './ui/CommentItem'
import type { Comment } from '../../types/commentType'
import { useAuth } from '../../context/AuthContext'

export default function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { post, loading, error, refreshPost } = usePost(id)
  const { comments, loading: commentsLoading, error: commentsError, refreshComments } = useComments(id)

  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null)
  const [replyToUserName, setReplyToUserName] = useState<string | null>(null)
  const [commentError, setCommentError] = useState<string | null>(null)
  const [submittingComment, setSubmittingComment] = useState(false)

  const [isEditPostOpen, setIsEditPostOpen] = useState(false)
  const [editPostTitle, setEditPostTitle] = useState('')
  const [editPostDescription, setEditPostDescription] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editingCommentText, setEditingCommentText] = useState('')

  const selectedParentComment = useMemo(
    () => comments.find((c) => c.id === replyToCommentId) ?? null,
    [comments, replyToCommentId],
  )

  const canEditPost = post?.userId === user?.id
  const commentFormTitle = replyToCommentId ? 'Reply to comment' : 'Add comment'

  const resetCommentForm = () => {
    setIsCommentFormOpen(false)
    setReplyToCommentId(null)
    setReplyToUserName(null)
    setCommentText('')
    setCommentError(null)
  }

  const openCommentForm = () => {
    setIsCommentFormOpen(true)
    setReplyToCommentId(null)
    setReplyToUserName(null)
  }

  const handleReplyClick = (commentId: string, userName: string) => {
    setIsCommentFormOpen(true)
    setReplyToCommentId(commentId)
    setReplyToUserName(userName)
  }

  const handleCommentSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!id) return
    if (!user) {
      setCommentError('Please log in to comment')
      return
    }
    setSubmittingComment(true)
    setCommentError(null)

    const created = await createComment({
      description: commentText,
      userId: user.id,
      postId: id,
      parentId: replyToCommentId,
    })

    setSubmittingComment(false)

    if (!created) {
      setCommentError('Failed to add comment')
      return
    }

    resetCommentForm()
    await refreshComments()
  }

  const openEditPost = () => {
    setEditPostTitle(post?.title ?? '')
    setEditPostDescription(post?.description ?? '')
    setIsEditPostOpen(true)
  }

  const handlePostUpdate = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!post?.id || !user) return
    const updated = await updatePost(post.id, {
      title: editPostTitle,
      description: editPostDescription,
      userId: user.id,
    })
    if (!updated) {
      alert('Failed to update post')
      return
    }
    setIsEditPostOpen(false)
    await refreshPost()
  }

  const handlePostDelete = async () => {
    if (!post?.id || !user) return
    if (!confirm('Delete this post?')) return
    const ok = await deletePost(post.id, user.id)
    if (ok) navigate('/')
    else alert('Failed to delete post')
  }

  const startEditComment = (commentId: string, text: string) => {
    setEditingCommentId(commentId)
    setEditingCommentText(text)
  }

  const cancelEditComment = () => {
    setEditingCommentId(null)
    setEditingCommentText('')
  }

  const saveEditComment = async (comment: Comment) => {
    if (!user) return
    const updated = await apiUpdateComment(comment.id, {
      description: editingCommentText,
      userId: user.id,
      postId: comment.postId,
      parentId: comment.parentId ?? null,
    })
    if (updated) {
      setEditingCommentId(null)
      setEditingCommentText('')
      await refreshComments()
    } else {
      alert('Failed to update comment')
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!user) return
    if (!confirm('Delete this comment?')) return
    const ok = await apiDeleteComment(commentId)
    if (ok) await refreshComments()
    else alert('Failed to delete comment')
  }

  if (loading) return <div className={styles.root}>Loading…</div>
  if (error) return <div className={styles.root}>Error: {error}</div>
  if (!post) return <div className={styles.root}>No post.</div>

  return (
    <div className={styles.root}>
      <Link className={styles.goback} to="/">
        Go Back
      </Link>
      <PostHeader
        title={post.title}
        createdAt={post.createdAt}
        canEdit={canEditPost}
        onEdit={openEditPost}
        onDelete={handlePostDelete}
      />
      <div className={styles.body}>{post.description || ''}</div>

      <div className={styles.commentToolbar}>
        <button type="button" className={styles.commentButton} onClick={openCommentForm}>
          Add comment
        </button>
        {selectedParentComment && (
          <div className={styles.commentReplyMeta}>
            Replying to comment #{selectedParentComment.id}
            {replyToUserName ? ` by ${replyToUserName}` : ''}
          </div>
        )}
      </div>

      <CommentForm
        isOpen={isCommentFormOpen}
        title={commentFormTitle}
        value={commentText}
        error={commentError}
        submitting={submittingComment}
        onChange={setCommentText}
        onSubmit={handleCommentSubmit}
        onCancel={resetCommentForm}
      />

      <EditPostForm
        isOpen={isEditPostOpen}
        title={editPostTitle}
        description={editPostDescription}
        onTitleChange={setEditPostTitle}
        onDescriptionChange={setEditPostDescription}
        onSubmit={handlePostUpdate}
        onCancel={() => setIsEditPostOpen(false)}
      />

      <section className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Comments</h2>
        {commentsLoading && <div className={styles.meta}>Loading comments…</div>}
        {commentsError && <div className={styles.meta}>Error: {commentsError}</div>}
        {!commentsLoading && !commentsError && comments.length === 0 && (
          <div className={styles.meta}>No comments yet.</div>
        )}
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isEditing={editingCommentId === comment.id}
              editingText={editingCommentText}
              canEdit={comment.userId === user?.id}
              onEditingTextChange={setEditingCommentText}
              onReply={handleReplyClick}
              onStartEdit={startEditComment}
              onCancelEdit={cancelEditComment}
              onSaveEdit={saveEditComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
