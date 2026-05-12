import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/auth.module.css'
import { signUp } from '../../services/signUp'
import { useAuth } from '../../context/AuthContext'

export default function SignUp() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [role, setRole] = useState('0')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const user = await signUp({
      userName,
      fullName,
      age: Number(age),
      role: Number(role),
      password,
    })

    setSubmitting(false)

    if (!user) {
      setError('Failed to create account')
      return
    }

    setUser(user)
    navigate('/')
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign up</h1>
        <p className={styles.subtitle}>Create a new account to start posting.</p>
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
            <span className={styles.fieldLabel}>Full name</span>
            <input
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Age</span>
            <input
              className={styles.input}
              type="number"
              min={0}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Role</span>
            <select className={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="0">User</option>
              <option value="1">Admin</option>
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Password</span>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.primaryButton} type="submit" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </section>
  )
}
