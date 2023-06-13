import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

import { BookWithRate } from '~/types/BookWithRate'
import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

export type GetBooksResponse = BookWithRate[]

const getBooksParamsSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
})

export type GetBooksParams = z.infer<typeof getBooksParamsSchema>

const getBooksHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetBooksResponse | NextAPIResponseError>,
) => {
  const paramsResult = getBooksParamsSchema.safeParse(req.query)

  if (!paramsResult.success) {
    const errorMessage = paramsResult.error.errors.map((err) => err.message)
    return res.status(400).json({
      message: 'Bad request',
      errors: errorMessage,
    })
  }

  const { category, search } = paramsResult.data

  const searchCriteria = search
    ? {
        OR: [
          {
            author: {
              contains: search,
            },
          },
          {
            name: {
              contains: search,
            },
          },
          {
            summary: {
              contains: search,
            },
          },
        ],
      }
    : {}

  try {
    const books = await prisma.book.findMany({
      where: {
        catergories: {
          some: {
            category: {
              name: category,
            },
          },
        },
        ...searchCriteria,
      },

      include: { ratings: true },
    })

    const booksWithRate = books.map((book) => ({
      ...book,
      rate: book.ratings.reduce((acc, cur) => acc + cur.rate, 0),
    }))

    return res.status(200).json(booksWithRate)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getBooksHandler)
