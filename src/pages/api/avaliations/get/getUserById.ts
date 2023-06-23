import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

import { AvaliationWithBookAndUser } from '~/types/AvaliationWithBookAndUser'

export type GetAvaliationsByUserIdResponse = {
  total_count: number
  hasNextPage: boolean
  items: AvaliationWithBookAndUser[]
}

const getAvaliationsParamsSchema = z.object({
  per_page: z.number({ coerce: true }).int().min(1).max(30).optional(),
  page: z.number({ coerce: true }).int().min(1).optional(),
  user_id: z.string().nonempty(),
  search: z.string().optional(),
})

export type GetAvaliationsByUserIdParams = z.infer<
  typeof getAvaliationsParamsSchema
>

const getAvaliationsByUserIdHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetAvaliationsByUserIdResponse | NextAPIResponseError>,
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
  const userId = paramsResult.data.user_id
  const search = paramsResult.data.search

  const offset = (page - 1) * perPage

  const searchCriteria = search
    ? {
        book: {
          OR: [
            { name: { contains: search } },
            { author: { contains: search } },
            { summary: { contains: search } },
          ],
        },
      }
    : {}
  try {
    const totalCountQuery = prisma.rating.count({
      where: {
        user: {
          id: userId,
        },
        ...searchCriteria,
      },
    })
    const avaliationsQuery = prisma.rating.findMany({
      where: {
        user: {
          id: userId,
        },
        ...searchCriteria,
      },
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

export default nextApiBuilder('GET')(getAvaliationsByUserIdHandler)
