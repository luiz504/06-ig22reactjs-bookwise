import { Sidebar } from '~/components/Sidebar'

import { Container, Main, Header, TopicsList, BooksGridList } from './styles'
import { Heading } from '~/components/Heading'
import { Binoculars } from 'phosphor-react'
import { TextInput } from '~/components/TextInput'
import { Tag } from '~/components/Tag'
import {
  ItemInfoCol,
  SugestionItem,
} from '../start/components/BooksSugestionAside/styles'

import { Rating } from '~/components/Rating'
import { Text } from '~/components/Text'
import Image from 'next/image'

export default function Explore() {
  const books = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: 'A revolucao dos Bichos',
    author: 'George Orwell',
    cover_url:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 4,
  }))

  return (
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
          <Tag selected>Tudo</Tag>
          <Tag>Computação</Tag>
          <Tag>Educação</Tag>
          <Tag>Fantasia</Tag>
          <Tag>Ficção científica</Tag>
          <Tag>Horror</Tag>
          <Tag>HQs</Tag>
          <Tag>Suspense</Tag>
        </TopicsList>

        <BooksGridList>
          {books.map((book) => (
            <SugestionItem key={book.id} size="sm" variant={'secondary'}>
              <Image src={book.cover_url} height={152} width={108} alt="book" />

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
  )
}
