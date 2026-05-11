import styles from '../../styles/board.module.css'

export default function Filters() {
  return (
    <div className={styles.filters}>
      <input className={styles.input} placeholder="Search posts..." />
      <select className={styles.select}>
        <option>All</option>
        <option>Tech</option>
        <option>Lifestyle</option>
      </select>
    </div>
  )
}