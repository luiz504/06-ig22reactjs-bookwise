import Image from 'next/image'

import { useDateFormatter } from '~/hooks/useDateFormater'

import { Heading, Text } from '~/components/texts'
import { Rating } from '~/components/Rating'

import { Container, Content, MetaRow, MetaCol } from './styles'
import { AvaliationWithBook } from '~/types/AvaliationWithBook'
import { FC } from 'react'

type CardAvaliationProps = {
  avaliation: AvaliationWithBook
}
export const CardAvaliation: FC<CardAvaliationProps> = ({ avaliation }) => {
  const { distanceFromNow } = useDateFormatter(avaliation.created_at)

  return (
    <Container>
      <Text size={'sm'}>{distanceFromNow}</Text>
      <Content>
        <MetaRow>
          <Image
            src={avaliation.book.cover_url.replace('public', '')}
            alt=""
            height={134}
            width={98}
          />
          <MetaCol>
            <Heading>{avaliation.book.name}</Heading>
            <Text>{avaliation.book.author}</Text>

            <Rating rating={avaliation.rate} />
          </MetaCol>
        </MetaRow>
        <Text size={'sm'}>{avaliation.description}</Text>
      </Content>
    </Container>
  )
}

export { CardAvaliationSkeleton } from './skeleton'
