import { Book } from '@prisma/client'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

interface BookWithScore extends Book {
  score: number
  rate_average: number
  ratings_count: number
}

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
      SELECT *,
        ROUND((5 * rate_average / 10 + 5 * (1 - (1 - 1.0 * ratings_count / 100) *
          (1 - 1.0 * ratings_count / 100 / 2) *
          (1 - 1.0 * ratings_count / 100 / 3) *
          (1 - 1.0 * ratings_count / 100 / 4) *
          (1 - 1.0 * ratings_count / 100 / 5))), 2) as score
      FROM (
        SELECT b.id, b.name, b.author, b.summary, b.cover_url, b.total_pages, b.created_at,
          COALESCE(AVG(r.rate), 0) as rate_average,
          CAST(COUNT(r.id) AS REAL) as ratings_count
        FROM books b
        LEFT JOIN ratings r ON b.id = r.book_id
        GROUP BY b.id
        LIMIT ${perPage}
        OFFSET ${offSet}
      ) as subquery
      ORDER BY score DESC
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
