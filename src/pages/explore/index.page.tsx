import { FormEvent, useRef } from 'react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { Binoculars } from 'phosphor-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { api } from '~/lib/axios'
import { buildQueryParams, queryParamToString } from '~/utils'

import { Rating } from '~/components/Rating'
import { Heading, Text, FeedbackText } from '~/components/texts'
import { Sidebar } from '~/components/Sidebar'
import { TextInput } from '~/components/TextInput'
import { CommentSidebar } from './components/CommentSidebar'
import { Skeleton } from '~/components/Skeleton'

import {
  Container,
  Main,
  Header,
  TopicsList,
  TopicItem,
  BooksGridList,
  ItemInfoCol,
  SugestionItem,
} from './styles'

import { GetCategoriesResponse } from '../api/categories/get.api'
import { GetBooksParams, GetBooksResponse } from '../api/books/get.api'

export default function Explore() {
  const router = useRouter()
  const { query } = router

  const category = queryParamToString(query.category)
  const search = queryParamToString(query.search)
  const bookOpenId = queryParamToString(query.bookOpenId)

  const isOpenBookModal = !!bookOpenId

  const inputSearchRef = useRef<HTMLInputElement>(null)

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

  const handleCloseModal = () => {
    router.push({
      pathname: '/explore',
      query: buildQueryParams({
        category,
        search,
      }),
    })
  }

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<GetCategoriesResponse>('/categories/get', {
        signal,
      })
      return data
    },
  })

  const skeletonList = Array.from({ length: 2 }, (_, i) => ({ id: i }))

  const {
    data: books,
    isLoading: isLoadingBooks,
    isSuccess: isSuccessBooks,
  } = useQuery({
    queryKey: ['books', { search, category }],
    queryFn: async ({ signal }) => {
      const params: GetBooksParams = {
        search,
        category,
      }
      const { data } = await api.get<GetBooksResponse>('/books/get', { params })
      return data
    },
    staleTime: 1000 * 60 * 2, // 2min
  })

  const feedbackMessage = () => {
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

  return (
    <>
      <NextSeo title="Explorar | BookWise" />

      <Container>
        <Sidebar />
        <Main>
          <Header as="form" onSubmit={handleSubmit}>
            <Heading>
              <Binoculars weight="bold" />
              Explorar
            </Heading>

            <TextInput
              ref={inputSearchRef}
              placeholder="Buscar livro ou autor"
              defaultValue={search}
            />
          </Header>

          <TopicsList>
            {isLoadingCategories &&
              skeletonList.map((cat) => (
                <Skeleton
                  key={cat.id}
                  css={{ height: 36, width: 120 }}
                  roundedFull
                  bg={'gray700'}
                />
              ))}

            {!isLoadingCategories && (
              <>
                <TopicItem
                  href={{
                    pathname: '/explore',
                    query: buildQueryParams({ search }),
                  }}
                  active={!category}
                >
                  Tudo
                </TopicItem>

                {categories?.map((cat) => (
                  <TopicItem
                    href={{
                      pathname: '/explore',
                      query: buildQueryParams({
                        category: cat.name,
                        search,
                      }),
                    }}
                    active={category === cat.name}
                    prefetch={false}
                    key={cat.id}
                  >
                    {cat.name}
                  </TopicItem>
                ))}
              </>
            )}
          </TopicsList>

          <BooksGridList>
            {isLoadingBooks &&
              skeletonList.map((s) => (
                <Skeleton
                  key={s.id}
                  css={{ height: 188, borderRadius: '$md' }}
                  bg={'gray700'}
                />
              ))}

            {!isLoadingBooks && (
              <>
                {books?.map((book) => (
                  <SugestionItem
                    key={book.id}
                    size="sm"
                    variant={'secondary'}
                    as={Link}
                    href={{
                      pathname: '/explore',
                      query: buildQueryParams({
                        search,
                        category,
                        bookOpenId: book.id,
                      }),
                    }}
                  >
                    <Image
                      src={book.cover_url.replace('public', '')}
                      height={152}
                      width={108}
                      alt="book"
                    />

                    <ItemInfoCol>
                      <Heading size="sm">{book.name}</Heading>
                      <Text size="sm">{book.author}</Text>

                      <Rating rating={book.rate} />
                    </ItemInfoCol>
                  </SugestionItem>
                ))}

                {!books?.length && isSuccessBooks && (
                  <FeedbackText size="sm">{feedbackMessage()}</FeedbackText>
                )}
              </>
            )}
          </BooksGridList>
        </Main>
      </Container>

      {isOpenBookModal && (
        <CommentSidebar
          open={isOpenBookModal}
          onOpenChange={handleCloseModal}
        />
      )}
    </>
  )
}
