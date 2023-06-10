import Image from 'next/image'
import { BookOpen, BookmarkSimple } from 'phosphor-react'

import { Heading } from '~/components/Heading'
import { Text } from '~/components/Text'
import { Rating } from '~/components/Rating'

import {
  CardBookContainer,
  MainInfoRow,
  MainInfoCol,
  ExtraInfoRow,
  ExtraInforCol,
} from './styles'

export const CardBook = () => {
  const book = {
    cover_url:
      'https://images.unsplash.com/photo-1685945899241-38453441f85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    title: 'Hábitos de Desenvolvedores Altamente Produtivos',
    author: 'Zeno Rocha',
    avaliations: {
      count: 3,
      rating: 4,
    },
  }

  return (
    <CardBookContainer>
      <MainInfoRow>
        <Image
          src={book.cover_url}
          alt="Book Cover"
          height={242}
          width={171.65}
        />

        <MainInfoCol>
          <Heading>{book.title}</Heading>

          <Text>{book.author}</Text>

          <div className="rating-row">
            <Rating rating={book.avaliations.rating} />

            <Text size="sm">{book.avaliations?.count} avaliacoes</Text>
          </div>
        </MainInfoCol>
      </MainInfoRow>
      <ExtraInfoRow>
        <ExtraInforCol>
          <BookmarkSimple weight="bold" size={24} />
          <div>
            <Text size="sm">Categoria</Text>
            <Heading size="sm">Computação, Educação</Heading>
          </div>
        </ExtraInforCol>

        <ExtraInforCol>
          <BookOpen weight="bold" size={24} />
          <div>
            <Text size="sm">Páginas</Text>
            <Heading size="sm">160</Heading>
          </div>
        </ExtraInforCol>
      </ExtraInfoRow>
    </CardBookContainer>
  )
}
