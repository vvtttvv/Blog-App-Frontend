import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/auth.module.css'
import { signIn } from '../../services/signIn'
import { useAuth } from '../../context/AuthContext'

export default function SignIn() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const user = await signIn({ userName, password })

    setSubmitting(false)

    if (!user) {
      setError('Invalid username or password')
      return
    }

    setUser(user)
    navigate('/')
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>Welcome back! Use your account details to continue.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Username</span>
            <input
              className={styles.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Password</span>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.primaryButton} type="submit" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  )
}
