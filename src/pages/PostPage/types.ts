export interface Post {
  id: string
  title: string
  description?: string
  content?: string
  userId?: string
  [key: string]: any
}

export interface Comment {
  id: string
  description: string
  userId: string
  postId: string
  parentId?: string
  [key: string]: any
}
