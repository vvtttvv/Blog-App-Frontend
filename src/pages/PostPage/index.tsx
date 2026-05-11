import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import styles from '../../styles/post-page.module.css'
import usePost from '../../hooks/usePost'
import useComments from '../../hooks/useComments'
import { createComment } from '../../services/createComment'
import { CURRENT_USER_ID } from '../../constants/currentUser'

export default function PostPage() {
	const { id } = useParams()
	const { post, loading, error } = usePost(id)
	const { comments, loading: commentsLoading, error: commentsError, refreshComments } = useComments(id)
	const [isCommentFormOpen, setIsCommentFormOpen] = useState(false)
	const [commentText, setCommentText] = useState('')
	const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null)
	const [replyToUserName, setReplyToUserName] = useState<string | null>(null)
	const [commentError, setCommentError] = useState<string | null>(null)
	const [submittingComment, setSubmittingComment] = useState(false)

	const selectedParentComment = useMemo(
		() => comments.find((comment) => comment.id === replyToCommentId) ?? null,
		[comments, replyToCommentId],
	)

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

	const handleCommentSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!id) return

		setSubmittingComment(true)
		setCommentError(null)

		const created = await createComment({
			description: commentText,
			userId: CURRENT_USER_ID,
			postId: id,
			parentId: replyToCommentId,
		})

		setSubmittingComment(false)

		if (!created) {
			setCommentError('Failed to add comment')
			return
		}

		setCommentText('')
		setReplyToCommentId(null)
		setReplyToUserName(null)
		setIsCommentFormOpen(false)
		await refreshComments()
	}

	if (loading) return <div className={styles.root}>Loading…</div>
	if (error) return <div className={styles.root}>Error: {error}</div>
	if (!post) return <div className={styles.root}>No post.</div>

	return (
		<div className={styles.root}>
			<Link className={styles.goback} to="/">
				Go Back
			</Link>
			<div className={styles.header}>
				<h1 className={styles.title}>{post.title}</h1>
				<p className={styles.meta}>
					{new Date(post.createdAt).toLocaleDateString('ru-RU')}
				</p>
			</div>
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

			{isCommentFormOpen && (
				<form className={styles.commentForm} onSubmit={handleCommentSubmit}>
					<h3 className={styles.commentFormTitle}>
						{replyToCommentId ? 'Reply to comment' : 'Add comment'}
					</h3>
					<label className={styles.commentField}>
						<span className={styles.meta}>Comment text</span>
						<textarea
							className={styles.commentTextarea}
							value={commentText}
							onChange={(event) => setCommentText(event.target.value)}
							required
						/>
					</label>
					{commentError && <div className={styles.commentError}>{commentError}</div>}
					<div className={styles.commentFormActions}>
						<button
							type="button"
							className={styles.cancelButton}
							onClick={() => {
								setIsCommentFormOpen(false)
								setReplyToCommentId(null)
								setReplyToUserName(null)
								setCommentText('')
								setCommentError(null)
							}}
							disabled={submittingComment}
						>
							Cancel
						</button>
						<button type="submit" className={styles.submitButton} disabled={submittingComment}>
							{submittingComment ? 'Sending...' : 'Send'}
						</button>
					</div>
				</form>
			)}

			<section className={styles.commentsSection}>
				<h2 className={styles.commentsTitle}>Comments</h2>
				{commentsLoading && <div className={styles.meta}>Loading comments…</div>}
				{commentsError && <div className={styles.meta}>Error: {commentsError}</div>}
				{!commentsLoading && !commentsError && comments.length === 0 && (
					<div className={styles.meta}>No comments yet.</div>
				)}
				<div className={styles.commentsList}>
					{comments.map((comment) => (
						<article key={comment.id} className={styles.commentCard}>
							<Link to={`/users/${comment.userId}`} className={styles.commentAuthorLink}>
								<div className={styles.commentAuthor}>{comment.userName || 'Anonymous'}</div>
							</Link>
							{comment.parentId && (
								<div className={styles.commentReplyMeta}>
									Reply to comment #{comment.parentId}
								</div>
							)}
							<p className={styles.commentBody}>{comment.description || ''}</p>
							<div className={styles.commentActions}>
								<button
									type="button"
									className={styles.replyButton}
									onClick={() => handleReplyClick(comment.id, comment.userName || 'Anonymous')}
								>
									Reply
								</button>
							</div>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}