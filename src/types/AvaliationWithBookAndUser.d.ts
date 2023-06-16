export type AvaliationWithBookAndUser = {
  id: string
  description: string
  created_at: Date
  rate: number
  user: {
    id: string
    name: string
    avatar_url: string | null
  }
  book: {
    id: string
    name: string
    author: string
    cover_url: string
  }
}
