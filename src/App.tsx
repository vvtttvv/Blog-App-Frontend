import './App.css'
import Header from './features/header'
import Board from './features/board'

function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="app-main">
        <Board />
      </main>
    </div>
  )
}

export default App
