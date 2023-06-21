import { Rating, Book } from '@prisma/client'

export interface BookWithRate {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: Date
  rate_average: number
  ratings_count: number
}
