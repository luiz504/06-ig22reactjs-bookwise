import { FC } from 'react'
import Image from 'next/image'
import { BookOpen, BookmarkSimple } from 'phosphor-react'

import { Heading, Text } from '~/components/texts'
import { Rating } from '~/components/Rating'

import {
  CardBookContainer,
  MainInfoRow,
  MainInfoCol,
  ExtraInfoRow,
  ExtraInforCol,
} from './styles'

import { BooksWithCategoriesName } from '~/types/BooksWithCategoriesName'

type CardBookProps = {
  book: BooksWithCategoriesName
}

export const CardBook: FC<CardBookProps> = ({ book }) => {
  return (
    <CardBookContainer>
      <MainInfoRow>
        <Image
          src={book.cover_url.replace('public', '')}
          alt="Book Cover"
          height={242}
          width={171.65}
        />

        <MainInfoCol>
          <Heading>{book.name}</Heading>

          <Text>{book.author}</Text>

          <div className="rating-row">
            <Rating rating={book.ratings_average} type="average" />

            <Text size="sm">
              {book.ratings_count}{' '}
              {book.ratings_count === 1 ? 'avaliação' : 'avaliações'}
            </Text>
          </div>
        </MainInfoCol>
      </MainInfoRow>
      <ExtraInfoRow>
        <ExtraInforCol>
          <BookmarkSimple weight="bold" size={24} />
          <div>
            <Text size="sm">Categoria</Text>
            <Heading size="sm">{book.categories.join(', ')}</Heading>
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

export { CardBookSkeleton } from './skeleton'
