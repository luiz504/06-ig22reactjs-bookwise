import { Rating, Book } from '@prisma/client'

type BookWithRating = Book & { ratings: Rating[] }

export interface BookWithRate extends BookWithRating {
  rate: number
}
