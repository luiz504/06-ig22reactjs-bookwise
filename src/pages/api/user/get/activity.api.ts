import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'
import { UserWithActivity } from '~/types/UserWIthActivity'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

export type GetUserActivityResponse = UserWithActivity

const getUserActivityParamsSchema = z.object({
  user_id: z.string().nonempty(),
})

export type GetUserActivityParams = z.infer<typeof getUserActivityParamsSchema>

const getUserActivityHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetUserActivityResponse | NextAPIResponseError>,
) => {
  const paramsResult = getUserActivityParamsSchema.safeParse(req.query)

  if (!paramsResult.success) {
    const errorMessage = paramsResult.error.errors.map((err) => err.message)
    return res.status(404).json({
      message: 'Not Found Request',
      errors: errorMessage,
    })
  }

  const userId = paramsResult.data.user_id

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { id: true, avatar_url: true, created_at: true, name: true },
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const totalPagesReadQueryPromise = prisma.$queryRaw<
      { sum: number | null }[]
    >`
      SELECT
        CAST(SUM(b.total_pages) AS REAL) AS sum

      FROM 
        ratings r
      JOIN 
        books b ON b.id = r.book_id
      where
        r.user_id = ${userId}
    `

    const totalRatedBooksQueryPromise = prisma.$queryRaw<
      { count: number | null }[]
    >`
      SELECT 
        CAST(COUNT(DISTINCT book_id) AS REAL) AS count
      
      FROM 
        ratings
      WHERE 
        user_id = ${userId}
    `

    // eslint-disable-next-line prettier/prettier
    const totalAuthorsReadQueryPromise = prisma.$queryRaw<{ count: number | null }[]>`
      SELECT
        CAST(COUNT(DISTINCT b.author) AS REAL) AS count

      FROM 
        ratings r
      JOIN 
        books b ON b.id = r.book_id
      WHERE 
        r.user_id = ${userId}      
    `

    // eslint-disable-next-line prettier/prettier
    const mostReadCategoryQueryPromise = prisma.$queryRaw<{ category_name: string | null }[]>`
      SELECT 
        c.name AS category_name
      
      FROM 
        categories c
      JOIN
        CategoriesOnBooks cob ON cob.category_id = c.id
      JOIN 
        books b ON b.id = cob.book_id
      JOIN 
        ratings r ON r.book_id = b.id
      WHERE 
        r.user_id = ${userId}
      GROUP BY 
        c.name
      ORDER BY 
        COUNT(*) DESC
      LIMIT 1
    `

    const [
      totalPagesRead,
      totalRatedBooks,
      totalAuthorsRead,
      mostReadCategory,
    ] = await Promise.all([
      totalPagesReadQueryPromise,
      totalRatedBooksQueryPromise,
      totalAuthorsReadQueryPromise,
      mostReadCategoryQueryPromise,
    ])

    const userIncremented: UserWithActivity = {
      ...user,
      total_pages_read: totalPagesRead[0]?.sum ?? 0,
      total_rated_books: totalRatedBooks[0]?.count ?? 0,
      total_authors_read: totalAuthorsRead[0]?.count ?? 0,
      most_read_category: mostReadCategory[0]?.category_name || null,
    }
    return res.status(200).json(userIncremented)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getUserActivityHandler)
