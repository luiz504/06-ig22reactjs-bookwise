import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { AvaliationWithUser } from '~/types/AvaliationWithUser'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

export type GetBookAvaliationsResponse = AvaliationWithUser[]

const getBookAvaliationsParamsSchema = z.object({
  bookId: z.string(),
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

  try {
    const avaliations = await prisma.rating.findMany({
      where: { book_id: bookId },
      include: { user: true },
    })

    const avaliationsSanitized: GetBookAvaliationsResponse = avaliations.map(
      (avaliation) => ({
        id: avaliation.id,
        rate: avaliation.rate,
        description: avaliation.description,
        created_at: avaliation.created_at,
        book_id: avaliation.book_id,
        user_id: avaliation.user.id,
        user: {
          name: avaliation.user.name,
          avatar_url: avaliation.user.avatar_url,
        },
      }),
    )

    return res.status(200).json(avaliationsSanitized)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getBookAvaliationsHandler)
