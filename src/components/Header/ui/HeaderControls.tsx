import type { User } from '../../../types/userType'
import styles from '../../../styles/header.module.css'

interface HeaderControlsProps {
  user: User | null
  isDark: boolean
  onToggleTheme: () => void
  onAddPost: () => void
  onOpenProfile: () => void
  onLogout: () => void
  onSignIn: () => void
  onSignUp: () => void
}

export default function HeaderControls({
  user,
  isDark,
  onToggleTheme,
  onAddPost,
  onOpenProfile,
  onLogout,
  onSignIn,
  onSignUp,
}: HeaderControlsProps) {
  const displayName = user?.fullName || user?.userName

  return (
    <div className={styles.controls}>
      {user && (
        <button className={styles.secondaryButton} onClick={onAddPost}>
          Add post
        </button>
      )}
      <button className={styles.themeBtn} onClick={onToggleTheme}>
        {isDark ? 'Light' : 'Dark'}
      </button>
      {user ? (
        <>
          <button className={styles.secondaryButton} onClick={onOpenProfile}>
            {displayName}
          </button>
          <button className={styles.secondaryButton} onClick={onLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button className={styles.secondaryButton} onClick={onSignIn}>
            Sign In
          </button>
          <button className={styles.primaryButton} onClick={onSignUp}>
            Sign Up
          </button>
        </>
      )}
    </div>
  )
}
