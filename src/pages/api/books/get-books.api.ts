import { Rating } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/lib/prisma'

export type BookWithRate = {
  rate: number
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: Date
  ratings: Rating[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const queries = req.query
  const categoryName = queries.category ? String(queries.category) : undefined
  const search = queries.search ? String(queries.search) : undefined

  const searchCriteria = search
    ? {
        OR: [
          {
            author: {
              contains: search,
            },
          },
          {
            name: {
              contains: search,
            },
          },
          {
            summary: {
              contains: search,
            },
          },
        ],
      }
    : {}
  const books = await prisma.book.findMany({
    where: {
      catergories: {
        some: {
          category: {
            name: categoryName,
          },
        },
      },
      ...searchCriteria,
    },

    include: { ratings: true },
  })

  const booksWithRate: BookWithRate[] = books.map((book) => ({
    ...book,
    rate: book.ratings.reduce((acc, cur) => acc + cur.rate, 0),
  }))

  return res.status(200).json(booksWithRate)
}
