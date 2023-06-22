import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { AvaliationWithUser } from '~/types/AvaliationWithUser'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

export type GetBookAvaliationsResponse = {
  total_count: number
  user_item?: AvaliationWithUser | null
  items: AvaliationWithUser[]
  hasNextPage: boolean
}

const getBookAvaliationsParamsSchema = z.object({
  bookId: z.string().nonempty(),
  rating_user_id: z.string().nonempty().optional(),
  per_page: z.number({ coerce: true }).int().min(1).max(30).optional(),
  page: z.number({ coerce: true }).int().min(1).optional(),
})

export type GetBookAvaliationsParams = z.infer<
  typeof getBookAvaliationsParamsSchema
>

const getBookAvaliationsHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetBookAvaliationsResponse | NextAPIResponseError>,
) => {
  const paramsResult = getBookAvaliationsParamsSchema.safeParse(req.query)

  if (!paramsResult.success) {
    const errorMessage = paramsResult.error.errors.map((err) => err.message)
    return res.status(400).json({
      message: 'Bad request',
      errors: errorMessage,
    })
  }

  const { bookId } = paramsResult.data

  const ratingUserId = paramsResult.data.rating_user_id

  const page = paramsResult.data.page || 1
  const perPage = paramsResult.data.per_page || 10

  const offset = (page - 1) * perPage

  try {
    const userAvaliationPromise =
      ratingUserId && page === 1
        ? prisma.rating.findFirst({
            where: { user_id: ratingUserId, book_id: bookId },
            include: { user: true },
          })
        : Promise.resolve(null)
    const totalCountPromise = prisma.rating.count({
      where: { NOT: { user_id: ratingUserId }, book_id: bookId },
    })
    const avaliationsPromise = prisma.rating.findMany({
      where: {
        book_id: bookId,
        NOT: {
          user_id: ratingUserId,
        },
      },
      include: { user: true },
      orderBy: {
        created_at: 'desc',
      },
      skip: offset,
      take: perPage,
    })

    const [userAvaliation, totalCount, avaliations] = await Promise.all([
      userAvaliationPromise,
      totalCountPromise,
      avaliationsPromise,
    ])
    const hasNextPage = offset + perPage < totalCount

    return res.status(200).json({
      total_count: totalCount,
      user_item: userAvaliation,
      hasNextPage,
      items: avaliations,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getBookAvaliationsHandler)
