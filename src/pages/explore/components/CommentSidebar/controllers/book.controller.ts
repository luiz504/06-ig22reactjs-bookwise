import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { api } from '~/lib/axios'
import {
  GetBookByIdParams,
  GetBookByIdResponse,
} from '~/pages/api/book/get.api'
import { buildQueryParams, queryParamToString } from '~/utils'

export const useBookController = () => {
  const router = useRouter()

  const category = queryParamToString(router.query.category)
  const search = queryParamToString(router.query.search)
  const bookOpenId = queryParamToString(router.query.bookOpenId)

  const redirect = () => {
    router.push({
      pathname: '/explore',
      query: buildQueryParams({
        category,
        search,
      }),
    })
  }

  const {
    data: bookData,
    isLoading: isLoadingBook,
    refetch: refetchBook,
  } = useQuery({
    queryKey: ['book-data', { bookOpenId }],
    queryFn: async () => {
      if (!bookOpenId) return undefined
      const params: GetBookByIdParams = { bookId: bookOpenId }
      try {
        const { data } = await api.get<GetBookByIdResponse>('/book/get', {
          params,
        })
        return data
      } catch (err) {
        redirect()
        throw err
      }
    },
    retry: false,
    enabled: !!bookOpenId,
  })

  const bookId = bookData?.id

  return { bookData, isLoadingBook, refetchBook, bookId }
}
