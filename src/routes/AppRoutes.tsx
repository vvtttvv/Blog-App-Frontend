import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Board from '../features/board'
import PostPage from '../pages/PostPage'

export default function AppRoutes() {
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
