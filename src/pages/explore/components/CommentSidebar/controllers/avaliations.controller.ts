import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useIntersection } from '~/hooks/useIntersection'
import { api } from '~/lib/axios'
import {
  GetBookAvaliationsParams,
  GetBookAvaliationsResponse,
} from '~/pages/api/book/avaliations/get.api'

type UseAvaliationsControllerParams = {
  bookId?: string
  loggedUserId?: string
}
export const useAvaliationsController = ({
  bookId,
  loggedUserId,
}: UseAvaliationsControllerParams) => {
  const { data, isLoading, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['book-avaliations', { bookId, loggedUserId }],
      queryFn: async ({ pageParam }) => {
        if (!bookId) return
        const params: GetBookAvaliationsParams = {
          bookId,
          rating_user_id: loggedUserId,
          page: pageParam,
          per_page: 5,
        }
        const { data } = await api.get<GetBookAvaliationsResponse>(
          '/book/avaliations/get',
          { params },
        )
        return data
      },
      enabled: !!bookId,
      retry: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.hasNextPage) {
          return pages.length + 1
        }
      },
    })

  const loadMoreSkeletonRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: loadMoreSkeletonRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      fetchNextPage()
    }
  }, [entry, isLoading, fetchNextPage])

  const userAvaliation = data?.pages?.[0]?.user_item

  const avaliationPages = data?.pages

  return {
    bookAvaliations: data,
    userAvaliation,
    avaliationPages,
    isLoadingAvaliations: isLoading,
    refetchAvaliations: refetch,
    hasNextAvaliationsPage: hasNextPage,
    loadMoreRef: ref,
  }
}
