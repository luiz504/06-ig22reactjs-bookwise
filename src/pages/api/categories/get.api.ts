import { Category } from '@prisma/client'
import { NextApiHandler } from 'next'
import { prisma } from '~/lib/prisma'
import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

export type GetCategoriesResponse = Category[]

const getCategoriesHandler: NextApiHandler<
  GetCategoriesResponse | NextAPIResponseError
> = async (_, res) => {
  try {
    const categories = await prisma.category.findMany()

    return res.status(200).json(categories)
  } catch {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getCategoriesHandler)
