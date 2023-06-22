import { NextApiHandler } from 'next'
import { z } from 'zod'

import { prisma } from '~/lib/prisma'
import { BooksWithCategoriesName } from '~/types/BooksWithCategoriesName'

import { nextApiBuilder, NextAPIResponseError } from '~/utils/apiHandlerUtils'

export type GetBookByIdResponse = BooksWithCategoriesName

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
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    })

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    const categoriesName = book.categories.map((item) => item.category.name)

    const bookWithCategoriesName: BooksWithCategoriesName = {
      ...book,
      categories: categoriesName,
    }

    return res.status(200).json(bookWithCategoriesName)
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getBookByIdHandler)
