export type AvaliationWithBook = {
  id: string
  description: string
  created_at: Date
  rate: number 
  book: {
    id: string
    name: string
    author: string
    cover_url: string

  }
}
