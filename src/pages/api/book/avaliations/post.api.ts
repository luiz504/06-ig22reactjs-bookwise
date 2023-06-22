import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'
import { buildAuthOptions } from '../../auth/[...nextauth].api'
import { Prisma } from '@prisma/client'

export const RATE_OPTIONS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const
export type RateOption = (typeof RATE_OPTIONS)[number]

const postAvaliationBodySchema = z.object({
  rate: z
    .number()
    .min(0, { message: 'Rate must be between 0 and 5.' })
    .max(5, { message: 'Rate must be between 0 and 5.' })
    .refine((val) => RATE_OPTIONS.includes(val as RateOption), {
      message: 'Rate must be one of the valid options.',
    }),
  description: z.string().nonempty(),
  book_id: z.string().nonempty(),
})

export type PostAvaliationBody = z.infer<typeof postAvaliationBodySchema>

const postAvaliationHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<NextAPIResponseError>,
) => {
  const session = await getServerSession(req, res, buildAuthOptions(req, res))

  if (!session?.user?.id) {
    return res.status(401).json({
      message: 'You should be logged in to Create a new PostAvaliation',
    })
  }

  const {
    user: { id },
  } = session

  const bodyResult = postAvaliationBodySchema.safeParse(req.body)

  if (!bodyResult.success) {
    const errorMessage = bodyResult.error.errors.map((err) => err.message)
    return res.status(400).json({
      message: 'Bad request',
      errors: errorMessage,
    })
  }

  const { rate, description, book_id } = bodyResult.data

  try {
    await prisma.rating.create({
      data: {
        rate,
        description,
        book_id,
        user_id: id,
      },
    })

    const result = await prisma.$queryRaw<
      { ratings_average: Prisma.Decimal }[]
    >`
      SELECT 
        ROUND(COALESCE(AVG(r.rate), 0), 2) AS ratings_average
      FROM 
        ratings r
      WHERE 
        book_id = ${book_id}     
    `

    const ratings_average = result[0]?.ratings_average
      ? Number(result[0].ratings_average)
      : 0

    if (!ratings_average) {
      return res.status(201).json({
        message: 'Success',
        errors: ['Unable to update book ratings_avarage and ratings_count'],
      })
    }

    await prisma.book.update({
      where: { id: book_id },
      data: {
        ratings_count: {
          increment: 1,
        },
        ratings_average: {
          set: ratings_average,
        },
      },
    })

    return res.status(201).json({ message: 'Success' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('POST')(postAvaliationHandler)
