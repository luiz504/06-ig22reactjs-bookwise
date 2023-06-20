import Image from 'next/image'
import { CaretRight } from 'phosphor-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { api } from '~/lib/axios'

import { Button } from '~/components/Button'
import { Skeleton } from '~/components/Skeleton'
import { Heading, Text } from '~/components/texts'
import { Rating } from '~/components/Rating'

import {
  Container,
  Header,
  SuggestionsList,
  SugestionItem,
  ItemInfoCol,
} from './styles'

import {
  GetBooksByRelevanceParams,
  GetBooksByRelevanceResponse,
} from '~/pages/api/books/getByRelevance.api'

export const BooksSugestionAside = () => {
  const queryBooksSuggestion = useQuery({
    queryKey: ['books-suggestions'],
    queryFn: async () => {
      const params: GetBooksByRelevanceParams = { per_page: 4 }
      const { data } = await api.get<GetBooksByRelevanceResponse>(
        '/books/getByRelevance',
        { params },
      )
      return data
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  })
  const { isLoading } = queryBooksSuggestion
  const booksSuggested = queryBooksSuggestion.data?.items

  const skeletonList = Array.from({ length: 4 }, (_, i) => ({ id: i }))

  return (
    <Container>
      <Header>
        <Text>Livros populares</Text>
        <Button as={Link} href={'/explore'} variant={'secondary'} size={'sm'}>
          Ver Todos
          <CaretRight weight="bold" />
        </Button>
      </Header>

      <SuggestionsList>
        {isLoading &&
          skeletonList.map((skel) => (
            <SugestionItem
              key={skel.id}
              skeleton
              size="sm"
              variant={'secondary'}
            >
              <Skeleton css={{ height: 94, width: 64 }} />

              <ItemInfoCol>
                <Skeleton css={{ height: 20 }} widthFull />

                <Skeleton css={{ height: 16, marginTop: '$1' }} widthFull />

                <Skeleton css={{ height: 16, marginTop: 'auto' }} widthFull />
              </ItemInfoCol>
            </SugestionItem>
          ))}
        {booksSuggested?.map((book) => (
          <SugestionItem
            key={book.id}
            as={Link}
            size="sm"
            variant={'secondary'}
            href={`/explore?bookOpenId=${book.id}`}
          >
            <Image
              src={book.cover_url.replace('public', '')}
              height={94}
              width={64}
              alt="book"
            />

            <ItemInfoCol>
              <Heading size="sm">{book.name}</Heading>
              <Text size="sm">{book.author}</Text>

              <Rating rating={book.rate_average} />
            </ItemInfoCol>
          </SugestionItem>
        ))}
      </SuggestionsList>
    </Container>
  )
}
