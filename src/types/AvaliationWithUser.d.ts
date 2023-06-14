export type AvaliationWithUser = {
  id: string
  rate: number
  description: string
  created_at: Date
  book_id: string
  user_id: string
  user: {
    name: string
    avatar_url: string | null
  }
}
