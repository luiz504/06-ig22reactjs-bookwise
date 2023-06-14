import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

type AvaliationWithBookAndUser = {
  id: string
  rate: number
  description: string
  created_at: Date
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

export type GetAvaliationsResponse = {
  total_count: number
  items: AvaliationWithBookAndUser[]
}

const getBookAvaliationsParamsSchema = z.object({
  bookId: z.string(),
})

export type GetBookAvaliationsParams = z.infer<
  typeof getBookAvaliationsParamsSchema
>

const getAvaliationsHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetAvaliationsResponse | NextAPIResponseError>,
) => {
  try {
    const totalCountQuery = prisma.rating.count()
    const avaliationsQuery = prisma.rating.findMany({
      select: {
        id: true,
        rate: true,
        description: true,
        created_at: true,
        user: {
          select: {
            id: true,
            avatar_url: true,
            name: true,
          },
        },
        book: {
          select: {
            id: true,
            name: true,
            author: true,
            cover_url: true,
          },
        },
      },
    })

    const [totalCount, avaliations] = await Promise.all([
      totalCountQuery,
      avaliationsQuery,
    ])

    return res.status(200).json({ total_count: totalCount, items: avaliations })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getAvaliationsHandler)
