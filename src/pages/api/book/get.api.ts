import { NextApiHandler } from 'next'
import { z } from 'zod'

import { prisma } from '~/lib/prisma'

import { BookWithRate } from '~/types/BookWithRate'
import { nextApiBuilder, NextAPIResponseError } from '~/utils/apiHandlerUtils'

export type GetBookByIdResponse = BookWithRate

const getBookByIdParamsSchema = z.object({
  bookId: z.string({
    invalid_type_error: 'BookId should be of type "string".',
    required_error: 'BookId is a required parameter.',
  }),
})

export type GetBookByIdParams = z.infer<typeof getBookByIdParamsSchema>

const getBookByIdHandler: NextApiHandler<
  GetBookByIdResponse | NextAPIResponseError
> = async (req, res) => {
  const params = getBookByIdParamsSchema.safeParse(req.query)

  if (!params.success) {
    const errorsMessages = params.error.errors.map((err) => err.message)

    return res
      .status(400)
      .json({ message: 'Bad Request', errors: errorsMessages })
  }

  const {
    data: { bookId },
  } = params

  try {
    const bookWithRate = await prisma.$queryRaw<BookWithRate[]>`
      SELECT 
        books.id,
        books.name,
        books.author,
        books.summary,
        books.cover_url,
        books.total_pages,
        books.created_at,
        IFNULL(AVG(ratings.rate), 0) AS rate_average,
        CAST(COUNT(ratings.id) AS REAL) AS ratings_count
      FROM 
        books
      LEFT JOIN
        ratings ON books.id = ratings.book_id
      WHERE 
        books.id = ${bookId}
      LIMIT 1
    `
    if (!bookWithRate.length) {
      return res.status(404).json({ message: 'Book not found' })
    }

    return res.status(200).json(bookWithRate[0])
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getBookByIdHandler)
