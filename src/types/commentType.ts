export interface Comment {
  id: string
  description: string
  userId: string
  userName: string
  postId: string
  parentId?: string
  [key: string]: any
}