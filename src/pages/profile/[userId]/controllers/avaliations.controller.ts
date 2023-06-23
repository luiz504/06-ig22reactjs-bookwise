import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useIntersection } from '~/hooks/useIntersection'
import { useSkeletonListGenerator } from '~/hooks/useSkeletonListGenetator'

import { api } from '~/lib/axios'

import {
  GetAvaliationsByUserIdParams,
  GetAvaliationsByUserIdResponse,
} from '~/pages/api/avaliations/get/byUserId.api'

export const useProfilePageAvaliationsController = ({
  userId,
}: {
  userId?: string
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState('')

  const handleSetSearchValue = () => {
    const inputFieldValue = searchInputRef.current?.value || ''
    setSearchValue(inputFieldValue)
  }

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['avaliationsByUserId', { userId, searchValue }],
    queryFn: async ({ signal, pageParam = 1 }) => {
      if (!userId) return
      const params: GetAvaliationsByUserIdParams = {
        user_id: userId,
        page: pageParam,
        per_page: 5,
        search: searchValue,
      }
      const { data } = await api.get<GetAvaliationsByUserIdResponse>(
        '/avaliations/get/byUserId',
        { params, signal },
      )
      return { ...data, id: uuidv4() }
    },
    enabled: !!userId,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.hasNextPage) {
        return pages.length + 1
      }
    },
    retry: false,
  })

  const avaliationsPages = data?.pages

  const loadMoreSkeletonRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: loadMoreSkeletonRef.current,
    threshold: 1,
    rootMargin: '450px',
  })

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      fetchNextPage()
    }
  }, [entry, isLoading, fetchNextPage])

  const skeletonList = useSkeletonListGenerator(3)

  const noResultsFound = data?.pages[0]?.items.length === 0

  function getFeedbackText() {
    if (searchValue) {
      return 'Não foram encontrados nehuma resultados para a sua pesquisa. Por favor, tente novamente com termos diferentes.'
    }
    return 'Não foram encontrados nenhuma avaliação feita por este usuário'
  }

  return {
    skeletonList,
    searchInputRef,
    handleSetSearchValue,
    avaliationsPages,
    isLoadingAvaliations: isLoading,
    hasNextPage,
    loadMoreSkeletonRef: ref,
    noResultsFound,
    getFeedbackText,
  }
}
