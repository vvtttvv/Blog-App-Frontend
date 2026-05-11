import Filters from './Filters'
import Content from './Content'
import styles from '../../styles/board.module.css'
import useBoard from '../../hooks/useBoard'

export default function Board() {
  useBoard()

  return (
    <section className={styles.board}>
      <div className={styles.top}>
        <Filters />
      </div>
      <div className={styles.bottom}>
        <Content />
      </div>
    </section>
  )
}