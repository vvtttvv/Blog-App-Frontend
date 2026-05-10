import styles from './styles.module.css'
import useHeader from './hooks/useHeader'

const Header = () => {
  const { isDark, toggle } = useHeader()
  return (
    <header className={styles.header}>
      <div className={styles.brand}>My Blog</div>
      <div className={styles.spacer} />
      <div className={styles.controls}>
        <button className={styles.themeBtn} onClick={toggle}>
          {isDark ? 'Light' : 'Dark'}
        </button>
        <div className={styles.authPlaceholder}>Sign in</div>
      </div>
    </header>
  )
}

export default Header
