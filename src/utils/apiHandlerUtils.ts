import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type NextAPIResponseError = { message: string; errors?: string[] }

export function nextApiBuilder<T extends NextApiHandler>(
  method: HttpMethod,
): (handler: T) => T {
  return (handler: T) => {
    const wrappedHandler: NextApiHandler = (
      req: NextApiRequest,
      res: NextApiResponse,
    ) => {
      if (req.method !== method) {
        return res.status(405).json({ message: 'Method Not Allowed' })
      }

      return handler(req, res)
    }

    return wrappedHandler as T
  }
}
