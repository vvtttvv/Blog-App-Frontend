import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Board from './components/Board'
import PostPage from './pages/PostPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Board />} />
          <Route path="posts/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}