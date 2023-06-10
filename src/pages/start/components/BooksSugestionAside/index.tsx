import Image from 'next/image'
import { CaretRight } from 'phosphor-react'

import { Button } from '~/components/Button'

import { Heading } from '~/components/Heading'
import { Rating } from '~/components/Rating'
import { Text } from '~/components/Text'

import {
  Container,
  Header,
  ItemInfoCol,
  SugestionItem,
  SuggestionsList,
} from './styles'

import Link from 'next/link'

export const BooksSugestionAside = () => {
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
        <SugestionItem
          as={Link}
          size="sm"
          variant={'secondary'}
          href={`/explore/item`}
          prefetch={false}
        >
          <Image
            src={
              'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
            }
            height={94}
            width={64}
            alt="book"
          />

          <ItemInfoCol>
            <Heading size="sm">A revolução dos bichos</Heading>
            <Text size="sm">George Orwell</Text>

            <Rating rating={4} />
          </ItemInfoCol>
        </SugestionItem>
      </SuggestionsList>
    </Container>
  )
}
