import Filters from './Filters'
import Content from './Content'
import styles from './styles.module.css'
import useBoard from './hooks/useBoard'

const Board = () => {
  useBoard()
  return (
    <section className={styles.board}>
      <div className={styles.top}><Filters /></div>
      <div className={styles.bottom}><Content /></div>
    </section>
  )
}

export default Board
