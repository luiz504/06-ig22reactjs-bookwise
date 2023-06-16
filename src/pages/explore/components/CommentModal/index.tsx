import { ComponentProps, useState } from 'react'
import { X } from 'phosphor-react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { api } from '~/lib/axios'

import { buildQueryParams, queryParamToString } from '~/utils'

import { Text } from '~/components/texts'
import { Button } from '~/components/Button'
import { CardBook } from './CardBook'
import { CardAvaliation } from './CardAvaliation'
import { CardAvaliator } from './CardAvaliator'
import { CardBookSkeleton } from './CardBook/skeleton'

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

type CommentModalProps = ComponentProps<typeof Root>

export const CommentModal = (props: CommentModalProps) => {
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

  const handleOpenAvaliator = () => {
    const loggedIn = true
    if (loggedIn) {
      setIsOpenAvaliator(true)
    }
  }

  const { data: bookData, isLoading: isLoadingBook } = useQuery({
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

  const { data: bookAvaliationsData } = useQuery({
    queryKey: ['book-avaliations', { bookId }],
    queryFn: async () => {
      if (!bookId) return
      const params: GetBookAvaliationsParams = {
        bookId,
      }
      const { data } = await api.get<GetBookAvaliationsResponse>(
        '/book/avaliations/get',
        { params },
      )
      return data
    },
    enabled: !!bookId,
    retry: false,
  })

  return (
    <Root {...props}>
      <Portal>
        <Overlay />
        <Content>
          <CloseBtn>
            <X weight="bold" size={15} />
          </CloseBtn>

          {isLoadingBook && <CardBookSkeleton />}
          {!isLoadingBook && !!bookData && <CardBook book={bookData} />}

          <AvaliationsSection>
            <AvaliationLabelAndActions>
              <Text size={'sm'}>Avaliações</Text>

              {!isOpenAvaliator && (
                <Button variant={'secondary'} onClick={handleOpenAvaliator}>
                  Avaliar
                </Button>
              )}
            </AvaliationLabelAndActions>

            <AvaliationsList>
              {isOpenAvaliator && <CardAvaliator />}

              {bookAvaliationsData?.map((aval) => (
                <CardAvaliation key={aval.id} avaliation={aval} />
              ))}
            </AvaliationsList>
          </AvaliationsSection>
        </Content>
      </Portal>
    </Root>
  )
}
