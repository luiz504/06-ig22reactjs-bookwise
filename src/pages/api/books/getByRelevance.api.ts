import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { BookWithScore } from '~/types/BookWithScore'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

export type GetBooksByRelevanceResponse = {
  total_count: number
  items: BookWithScore[]
}

const getBooksByRelevanceSchema = z.object({
  per_page: z.number({ coerce: true }).int().min(1).max(30).optional(),
  page: z.number({ coerce: true }).int().min(1).optional(),
})

export type GetBooksByRelevanceParams = z.infer<
  typeof getBooksByRelevanceSchema
>

const getBooksByRelevanceHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetBooksByRelevanceResponse | NextAPIResponseError>,
) => {
  const paramsResult = getBooksByRelevanceSchema.safeParse(req.query)

  if (!paramsResult.success) {
    const errorMessage = paramsResult.error.errors.map((err) => err.message)
    return res.status(400).json({
      message: 'Bad request',
      errors: errorMessage,
    })
  }

  const page = paramsResult.data.page || 1
  const perPage = paramsResult.data.per_page || 10

  const offSet = (page - 1) * perPage

  try {
    const booksFindQuery = prisma.$queryRaw<BookWithScore[]>`
      SELECT 
        b.*,
        ROUND((5 * b.ratings_average / 10 + 5 * (1 - (1 - 1.0 * b.ratings_count / 100) *
        (1 - 1.0 * b.ratings_count / 100 / 2) *
        (1 - 1.0 * b.ratings_count / 100 / 3) *
        (1 - 1.0 * b.ratings_count / 100 / 4) *
        (1 - 1.0 * b.ratings_count / 100 / 5))), 2) as score     
      FROM books b
      LEFT JOIN ratings r ON b.id = r.book_id
      GROUP BY b.id
      ORDER BY score DESC
      LIMIT ${perPage}
      OFFSET ${offSet}
    `
    const booksCountQuery = prisma.book.count()

    const [total_count, books] = await Promise.all([
      booksCountQuery,
      booksFindQuery,
    ])

    return res.status(200).json({ items: books, total_count })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getBooksByRelevanceHandler)
