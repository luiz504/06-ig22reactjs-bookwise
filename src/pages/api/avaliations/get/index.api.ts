import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

import { AvaliationWithBookAndUser } from '~/types/AvaliationWithBookAndUser'

export type GetAvaliationsResponse = {
  total_count: number
  hasNextPage: boolean
  items: AvaliationWithBookAndUser[]
}

const getAvaliationsParamsSchema = z.object({
  per_page: z.number({ coerce: true }).int().min(1).max(30).optional(),
  page: z.number({ coerce: true }).int().min(1).optional(),
})

export type GetAvaliationsParams = z.infer<typeof getAvaliationsParamsSchema>

const getAvaliationsHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetAvaliationsResponse | NextAPIResponseError>,
) => {
  const paramsResult = getAvaliationsParamsSchema.safeParse(req.query)

  if (!paramsResult.success) {
    const errorMessage = paramsResult.error.errors.map((err) => err.message)
    return res.status(400).json({
      message: 'Bad request',
      errors: errorMessage,
    })
  }
  const page = paramsResult.data.page || 1
  const perPage = paramsResult.data.per_page || 10

  const offset = (page - 1) * perPage

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
      orderBy: {
        created_at: 'desc',
      },
      take: perPage,
      skip: offset,
    })

    const [totalCount, avaliations] = await Promise.all([
      totalCountQuery,
      avaliationsQuery,
    ])
    const hasNextPage = offset + perPage < totalCount

    return res
      .status(200)
      .json({ total_count: totalCount, items: avaliations, hasNextPage })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getAvaliationsHandler)
