export interface Post {
  id: string
  title: string
  description?: string
  userId: string
  createdAt: string
  [key: string]: any
}