import { FC } from 'react'
import Image from 'next/image'

import { Heading, Text } from '~/components/texts'
import { Rating } from '~/components/Rating'
import { ProfileImage } from '~/components/ProfileImage'

import {
  BookInfoRow,
  BookInfoSection,
  Container,
  Header,
  UserInfo,
} from './styles'
import { useDateFormatter } from '~/hooks/useDateFormater'
import Link from 'next/link'

type CardBookAvaliationProps = {
  data: {
    id: string
    created_at: Date
    description: string
    rate: number
    user: {
      id: string
      name: string
      avatar_url: string | null
    }
    book: {
      name: string
      author: string
      cover_url: string
    }
  }
}

export const CardBookAvaliation: FC<CardBookAvaliationProps> = ({ data }) => {
  const { book, user, rate, created_at, description } = data

  const { createdDateTime, createdTimeTitle, distanceFromNow } =
    useDateFormatter(created_at)

  return (
    <Container variant={'secondary'}>
      <Header>
        <Link href={`/profile/${user.id}`}>
          <ProfileImage
            src={user.avatar_url || ''}
            size={40}
            alt="user profile"
          />
        </Link>

        <UserInfo>
          <Text size="md">{user.name}</Text>
          <time dateTime={createdDateTime || ''} title={createdTimeTitle || ''}>
            {distanceFromNow}
          </time>
        </UserInfo>

        <Rating rating={rate} />
      </Header>
      <BookInfoRow>
        <Image
          src={book.cover_url?.replace('public', '')}
          height={152}
          width={108}
          alt="book cover image"
        />
        <BookInfoSection>
          <Heading size={'sm'}>{book.name}</Heading>
          <Text as="span" size={'sm'}>
            {book.author}
          </Text>

          <Text size={'sm'}>{description}</Text>
        </BookInfoSection>
      </BookInfoRow>
    </Container>
  )
}
