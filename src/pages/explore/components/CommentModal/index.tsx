import { ComponentProps, Fragment, useEffect, useRef, useState } from 'react'
import { X } from 'phosphor-react'
import { useRouter } from 'next/router'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { api } from '~/lib/axios'

import { buildQueryParams, queryParamToString } from '~/utils'

import { Text } from '~/components/texts'
import { Button } from '~/components/Button'
import { CardBook, CardBookSkeleton } from './CardBook'
import { CardAvaliation, CardAvaliationSkeleton } from './CardAvaliation'

import { CardAvaliator } from './CardAvaliator'

import {
  Root,
  Portal,
  Overlay,
  Content,
  CloseBtn,
  AvaliationsSection,
  AvaliationLabelAndActions,
  AvaliationsList,
} from './styles'

import {
  GetBookAvaliationsParams,
  GetBookAvaliationsResponse,
} from '~/pages/api/book/avaliations/get.api'
import {
  GetBookByIdParams,
  GetBookByIdResponse,
} from '~/pages/api/book/get.api'
import { useSession } from 'next-auth/react'
import { SignInModal } from '../SignInModal'
import { useIntersection } from '~/hooks/useIntersection'
import { onPointerDownOutside } from '~/utils/onPointerDownOutside'

type CommentModalProps = ComponentProps<typeof Root>

export const CommentModal = (props: CommentModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const [isOpenAvaliator, setIsOpenAvaliator] = useState(false)
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

  const { data: session } = useSession()

  const logged = !!session
  const loggedUserId = session?.user.id

  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState(false)

  const handleOpenAvaliator = () => {
    if (logged) {
      setIsOpenAvaliator(true)
      return
    }
    setIsOpenModalSignIn(true)
  }

  const {
    data: bookAvaliations,
    isLoading: isLoadingAvaliations,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
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
      return undefined
    },
  })

  const loadMoreSkeletonRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: loadMoreSkeletonRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && !isLoadingAvaliations) {
      fetchNextPage()
    }
  }, [entry, isLoadingAvaliations, fetchNextPage])

  const userAvaliation = bookAvaliations?.pages?.[0]?.user_item

  const avaliationPages = bookAvaliations?.pages

  const showBtnCreateAvaliation =
    !isLoadingAvaliations && bookId && !userAvaliation && !isOpenAvaliator

  const avalationsSkeletonList = Array.from({ length: 3 }, (_, i) => ({
    id: i,
  }))

  function onSuccessCreateAvaliation() {
    refetchBook()
    refetch()
  }

  return (
    <>
      <Root {...props}>
        <Portal>
          <Overlay />
          <Content
            ref={contentRef}
            onPointerDownOutside={(e) => onPointerDownOutside(e, contentRef)}
          >
            <CloseBtn>
              <X weight="bold" size={15} />
            </CloseBtn>

            {isLoadingBook && <CardBookSkeleton />}

            {!isLoadingBook && !!bookData && <CardBook book={bookData} />}

            <AvaliationsSection>
              <AvaliationLabelAndActions>
                <Text size={'sm'}>Avaliações</Text>

                {showBtnCreateAvaliation && (
                  <Button variant={'secondary'} onClick={handleOpenAvaliator}>
                    Avaliar
                  </Button>
                )}
              </AvaliationLabelAndActions>

              <AvaliationsList>
                {isLoadingAvaliations &&
                  avalationsSkeletonList.map((val) => (
                    <CardAvaliationSkeleton key={val.id} />
                  ))}

                {isOpenAvaliator && !!bookId && (
                  <CardAvaliator
                    bookId={bookId}
                    onClose={() => setIsOpenAvaliator(false)}
                    onSuccess={onSuccessCreateAvaliation}
                  />
                )}

                {userAvaliation && (
                  <CardAvaliation avaliation={userAvaliation} />
                )}

                {avaliationPages?.map((page, i) => (
                  <Fragment key={`page-${i}`}>
                    {page?.items.map((aval) => (
                      <CardAvaliation key={aval.id} avaliation={aval} />
                    ))}
                  </Fragment>
                ))}

                {hasNextPage && <CardAvaliationSkeleton ref={ref} />}
              </AvaliationsList>
            </AvaliationsSection>
          </Content>
        </Portal>
      </Root>

      {isOpenModalSignIn && (
        <SignInModal
          open={isOpenModalSignIn}
          onOpenChange={(v) => setIsOpenModalSignIn(v)}
        />
      )}
    </>
  )
}
