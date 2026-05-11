import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className="app-root">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}