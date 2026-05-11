import { Link, useParams } from 'react-router-dom'
import styles from '../../styles/post-page.module.css'
import usePost from '../../hooks/usePost'
import useComments from '../../hooks/useComments'

export default function PostPage() {
	const { id } = useParams()
	const { post, loading, error } = usePost(id)
	const { comments, loading: commentsLoading, error: commentsError } = useComments(id)

	if (loading) return <div className={styles.root}>Loading…</div>
	if (error) return <div className={styles.root}>Error: {error}</div>
	if (!post) return <div className={styles.root}>No post.</div>

	return (
		<div className={styles.root}>
			<Link to="/">← Back</Link>
			<h1 className={styles.title}>{post.title}</h1>
			<p className={styles.meta}>{post.createdAt}</p>
			<div className={styles.body}>{post.description || post.content || ''}</div>

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
							<div className={styles.commentAuthor}>{comment.userName || 'Anonymous'}</div>
							<p className={styles.commentBody}>{comment.description || ''}</p>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}
