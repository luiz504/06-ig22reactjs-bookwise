import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useRef } from 'react'
import { api } from '~/lib/axios'
import { buildQueryParams, queryParamToString } from '~/utils'
import { GetCategoriesResponse } from '../api/categories/get.api'
import { GetBooksParams, GetBooksResponse } from '../api/books/get.api'
import { v4 as uuidv4 } from 'uuid'
import { useIntersection } from '~/hooks/useIntersection'
import { useSkeletonListGenerator } from '~/hooks/useSkeletonListGenetator'

export const useExplorePageController = () => {
  const inputSearchRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const { query } = router

  const category = queryParamToString(query.category)
  const search = queryParamToString(query.search)
  const bookOpenId = queryParamToString(query.bookOpenId)

  const isOpenBookSidebar = !!bookOpenId

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputElement = inputSearchRef.current
    const inputValue = inputElement?.value
    if (inputValue !== search) {
      router.push({
        pathname: '/explore',
        query: buildQueryParams({
          category,
          search: inputValue,
        }),
      })
    }
  }

  //* Sidebar Handler
  const handleCloseBookSidebar = () => {
    router.push({
      pathname: '/explore',
      query: buildQueryParams({
        category,
        search,
      }),
    })
  }

  //* Catetogories Fetcher
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<GetCategoriesResponse>('/categories/get', {
        signal,
      })

      return data
    },
    staleTime: Infinity,
  })

  //* Books Fetchers / handlers
  const loadMoreSkeletonRef = useRef<HTMLDivElement>(null)
  const {
    data,
    isLoading: isLoadingBooks,
    isSuccess: isSuccessBooks,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['explore-books', { search, category }],
    queryFn: async ({ signal, pageParam = 1 }) => {
      const params: GetBooksParams = {
        search,
        category,
        page: pageParam,
        per_page: 4,
      }
      const { data } = await api.get<GetBooksResponse>('/books/get', {
        params,
        signal,
      })
      return { ...data, id: uuidv4() }
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.hasNextPage) {
        return pages.length + 1
      }
    },
    staleTime: 1000 * 60 * 2, // 2min
    retry: false,
  })

  const booksPages = data?.pages

  const { ref, entry } = useIntersection({
    root: loadMoreSkeletonRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && !isLoadingBooks) {
      fetchNextPage()
    }
  }, [entry, isLoadingBooks, fetchNextPage])

  //* UI Processing
  const skeletonList = useSkeletonListGenerator(2)

  const getFeedbackMessage = () => {
    const hasSearchText = !!search?.length
    const hasCategorySelected = !!category?.length

    if (hasSearchText && hasCategorySelected) {
      return (
        <>
          Não foram encontrados resultados para a sua pesquisa com o termo{' '}
          <strong>{search}</strong> na categoria selecionada. Por favor, tente
          novamente com termos diferentes ou remova a categoria para expandir
          sua busca.
        </>
      )
    }

    if (hasSearchText && !hasCategorySelected) {
      return 'Não foram encontrados resultados para a sua pesquisa. Por favor, tente novamente com termos diferentes.'
    }

    if (!hasSearchText && hasCategorySelected) {
      return 'Não foram encontrados resultados para a categoria selecionada. Por favor, tente novamente com uma categoria diferente.'
    }
    return 'Nenhum livro foi encontrado.'
  }

  return {
    isOpenBookSidebar,
    handleCloseBookSidebar,
    handleSubmit,
    inputSearchRef,
    search,
    category,
    categories,
    isLoadingCategories,
    booksPages,
    hasNextPage,
    isSuccessBooks,
    isLoadingBooks,
    loadMoreSkeletonRef: ref,
    getFeedbackMessage,
    skeletonList,
  }
}
