import { ComponentProps, useState } from 'react'
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
import { X } from 'phosphor-react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import {
  GetBookByIdParams,
  GetBookByIdResponse,
} from '~/pages/api/book/get.api'
import { api } from '~/lib/axios'

import { buildQueryParams, queryParamToString } from '~/utils'

import { Text } from '~/components/Text'
import { Button } from '~/components/Button'
import { CardBook } from './CardBook'
import { CardPost } from './CardPost'
import { CardAvaliator } from './CardAvaliator'
import { CardBookSkeleton } from './CardBook/skeleton'

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
              <CardPost />
            </AvaliationsList>
          </AvaliationsSection>
        </Content>
      </Portal>
    </Root>
  )
}
