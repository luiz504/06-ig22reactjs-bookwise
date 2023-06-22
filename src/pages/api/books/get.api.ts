import { Book } from '@prisma/client'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

export type GetBooksResponse = {
  items: Book[]
  total_count: number
  hasNextPage: boolean
}

const getBooksParamsSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  per_page: z.number({ coerce: true }).int().min(1).max(30).optional(),
  page: z.number({ coerce: true }).int().min(1).optional(),
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

  const page = paramsResult.data.page || 1
  const perPage = paramsResult.data.per_page || 10

  const offset = (page - 1) * perPage

  try {
    const totalCountPromise = prisma.book.count({
      where: {
        categories: {
          some: {
            category: {
              name: category,
            },
          },
        },
        ...searchCriteria,
      },
    })

    const booksPromise = prisma.book.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: category,
            },
          },
        },
        ...searchCriteria,
      },

      take: perPage,
      skip: offset,
    })

    const [totalCount, books] = await Promise.all([
      totalCountPromise,
      booksPromise,
    ])

    const hasNextPage = offset + perPage < totalCount

    return res
      .status(200)
      .json({ total_count: totalCount, items: books, hasNextPage })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getBooksHandler)
