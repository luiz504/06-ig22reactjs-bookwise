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
    const book = await prisma.book.findFirstOrThrow({
      where: { id: bookId },
      include: {
        ratings: true,
      },
    })
    const bookWithRate: BookWithRate = {
      ...book,
      rate: book.ratings.reduce((acc, cur) => acc + cur.rate, 0),
    }

    return res.status(200).json(bookWithRate)
  } catch (err) {
    return res.status(404).json({ message: 'Book not found' })
  }
}

export default nextApiBuilder('GET')(getBookByIdHandler)
