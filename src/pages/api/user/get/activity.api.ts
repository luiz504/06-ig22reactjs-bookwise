import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

import { NextAPIResponseError, nextApiBuilder } from '~/utils/apiHandlerUtils'

type User = {
  id: string
  name: string
  avatar_url: string | null
  created_at: Date
}
export type GetUserActivityResponse = User

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
    return res.status(400).json({
      message: 'Bad request',
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

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default nextApiBuilder('GET')(getUserActivityHandler)
