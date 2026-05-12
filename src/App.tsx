import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Board from './components/Board'
import PostPage from './pages/PostPage'
import UserProfile from './pages/UserProfile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Board />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}