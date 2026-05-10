import { Outlet } from 'react-router-dom'
import Header from '../features/header'

const Layout = () => {
  return (
    <div className="app-root">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
