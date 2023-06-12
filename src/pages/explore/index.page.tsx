import { FormEvent, useRef, useState } from 'react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { Binoculars } from 'phosphor-react'
import { useRouter } from 'next/router'
import { Category } from '@prisma/client'
import { GetServerSideProps } from 'next'

import { Rating } from '~/components/Rating'
import { Text } from '~/components/Text'
import { Sidebar } from '~/components/Sidebar'
import { Heading } from '~/components/Heading'
import { TextInput } from '~/components/TextInput'
import { CommentModal } from './components/CommentModal'
import { serverApi } from '~/lib/axios'
import { BookWithRate } from '../api/books/get-books.api'
import { queryBuilder } from '~/utils/queryBuilder'
import {
  ItemInfoCol,
  SugestionItem,
} from '../start/components/BooksSugestionAside/styles'

import {
  Container,
  Main,
  Header,
  TopicsList,
  TopicItem,
  BooksGridList,
} from './styles'

interface ExploreProps {
  categories: Category[]
  books: BookWithRate[]
}
export default function Explore({ books, categories }: ExploreProps) {
  const router = useRouter()
  const { category, search } = router.query
  const selectedCategory = category ? String(category) : undefined
  const searchValue = search ? String(search) : undefined

  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false)

  const inputSearchRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputElement = inputSearchRef.current
    const inputValue = inputElement?.value
    if (inputValue !== search) {
      router.push({
        pathname: '/explore',
        query: queryBuilder({
          category: selectedCategory,
          search: inputValue,
        }),
      })
    }
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
            <TopicItem
              href={{
                pathname: '/explore',
                query: queryBuilder({ search: searchValue }),
              }}
              active={!selectedCategory}
            >
              Tudo
            </TopicItem>

            {categories.map((cat) => (
              <TopicItem
                href={{
                  pathname: '/explore',
                  query: queryBuilder({
                    category: cat.name,
                    search: searchValue,
                  }),
                }}
                active={selectedCategory === cat.name}
                prefetch={false}
                key={cat.id}
              >
                {cat.name}
              </TopicItem>
            ))}
          </TopicsList>

          <BooksGridList>
            {books.map((book) => (
              <SugestionItem
                key={book.id}
                size="sm"
                variant={'secondary'}
                onClick={() => setIsOpenCommentModal(true)}
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
          </BooksGridList>
        </Main>
      </Container>

      <CommentModal
        open={isOpenCommentModal}
        onOpenChange={setIsOpenCommentModal}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { data: categories } = await serverApi.get('/categories/get-categories')

  const { data: books } = await serverApi.get<BookWithRate>(
    '/books/get-books',
    {
      params: {
        category: query.category,
        search: query.search,
      },
    },
  )

  return {
    props: { books, categories },
  }
}
