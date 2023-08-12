export interface ImageProps {
  id?: string
  url?: string
  fitUrl?: string
  createdAt?: string
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  id?: string
  columnId?: string
  email?: string
  description?: string
  avatar?: ImageProps
}

export interface ColumnProps {
  id: string
  title: string
  avatar?: ImageProps
  author?: string
  description: string
}

export interface PostProps {
  id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt?: string
  columnId: string
  authorId?: string
  author?: string | UserProps
  isHTML?: boolean
}

export interface RuleProps {
  type: 'required' | 'email' | 'custom'
  message: string
  validator?: () => boolean
}

export type MessageType = 'success' | 'error' | 'default'

export interface ResponseType<P = any> {
  success: boolean
  message: string
  data: P
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

interface ListProps<P> {
  [id: string]: P
}

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: {
    data: ListProps<ColumnProps>
    isLoaded: boolean
  }
  posts: {
    data: ListProps<PostProps>
    loadedColumns: Array<string>
  }
  user: UserProps
}
