import styles from './styles.module.css'

const Filters = () => {
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

export default Filters
