import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/header.module.css'
import useHeader from '../../hooks/useHeader'
import { useAuth } from '../../context/AuthContext'
import CreatePostModal from './ui/CreatePostModal'
import HeaderControls from './ui/HeaderControls'

export default function Header() {
  const { isDark, toggle } = useHeader()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const handlePostCreated = (postId?: string) => {
    if (postId) navigate(`/posts/${postId}`)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>My Blog</div>
        <div className={styles.spacer} />
        <HeaderControls
          user={user}
          isDark={isDark}
          onToggleTheme={toggle}
          onAddPost={() => setIsCreatePostOpen(true)}
          onOpenProfile={() => user && navigate(`/users/${user.id}`)}
          onLogout={logout}
          onSignIn={() => navigate('/signin')}
          onSignUp={() => navigate('/signup')}
        />
      </header>
      {isCreatePostOpen && user && (
        <CreatePostModal onClose={() => setIsCreatePostOpen(false)} onCreated={handlePostCreated} userId={user.id} />
      )}
    </>
  )
}