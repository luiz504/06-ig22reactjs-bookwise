import { useState } from 'react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { Binoculars } from 'phosphor-react'

import {
  ItemInfoCol,
  SugestionItem,
} from '../start/components/BooksSugestionAside/styles'
import { Rating } from '~/components/Rating'
import { Text } from '~/components/Text'
import { Sidebar } from '~/components/Sidebar'
import { Heading } from '~/components/Heading'
import { TextInput } from '~/components/TextInput'
import { CommentModal } from './components/CommentModal'

import {
  Container,
  Main,
  Header,
  TopicsList,
  TopicItem,
  BooksGridList,
} from './styles'

export default function Explore() {
  const books = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: 'A revolucao dos Bichos',
    author: 'George Orwell',
    cover_url:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 4,
  }))

  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false)

  return (
    <>
      <NextSeo title="Explorar | BookWise" />

      <Container>
        <Sidebar />
        <Main>
          <Header>
            <Heading>
              <Binoculars weight="bold" />
              Explorar
            </Heading>

            <TextInput placeholder="Buscar livro ou autor" />
          </Header>

          <TopicsList>
            <TopicItem selected>Tudo</TopicItem>
            <TopicItem>Computação</TopicItem>
            <TopicItem>Educação</TopicItem>
            <TopicItem>Fantasia</TopicItem>
            <TopicItem>Ficção científica</TopicItem>
            <TopicItem>Horror</TopicItem>
            <TopicItem>HQs</TopicItem>
            <TopicItem>Suspense</TopicItem>
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
                  src={book.cover_url}
                  height={152}
                  width={108}
                  alt="book"
                />

                <ItemInfoCol>
                  <Heading size="sm">{book.title}</Heading>
                  <Text size="sm">{book.author}</Text>

                  <Rating rating={book.rating} />
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
