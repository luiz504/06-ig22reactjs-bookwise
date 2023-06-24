import React from 'react'
import { BookOpen, BookmarkSimple, Books, UserList } from 'phosphor-react'

import { ProfileImage } from '~/components/ProfileImage'
import { useDateFormatter } from '~/hooks/useDateFormater'
import { Heading, Text } from '~/components/texts'

import { Container, Header, MetaItem, UserMetaList } from './styles'

import { UserWithActivity } from '~/types/UserWIthActivity'

type ProfileAsideProps = {
  user: UserWithActivity
}
export const ProfileAside: React.FC<ProfileAsideProps> = ({ user }) => {
  const { distanceFromNow } = useDateFormatter(user.created_at)

  const userMetas = {
    read_pages: {
      value: user.total_pages_read,
      label: 'Páginas lidas',
      icon: <BookOpen weight={'regular'} size={32} />,
    },
    avaliated_books: {
      value: user.total_rated_books,
      label: 'Livros Avaliados',
      icon: <Books weight={'regular'} size={32} />,
    },
    read_authors: {
      value: user.total_authors_read,
      label: 'Autores lidos',
      icon: <UserList weight={'regular'} size={32} />,
    },
    category_most_read: {
      value: user.most_read_category || '--',
      label: 'Categoria mais lida',
      icon: <BookmarkSimple weight={'regular'} size={32} />,
    },
  }

  return (
    <Container>
      <Header>
        <ProfileImage
          src={user.avatar_url || ''}
          alt={`foto de perfil do ${user.name} `}
          size={72}
        />

        <Heading>{user.name}</Heading>
        <Text size={'sm'}>{distanceFromNow}</Text>
      </Header>

      <hr />

      <UserMetaList>
        {Object.entries(userMetas).map(([key, value]) => (
          <MetaItem key={key}>
            {value.icon}

            <div>
              <Heading size="sm">{value.value}</Heading>
              <Text size="sm">{value.label}</Text>
            </div>
          </MetaItem>
        ))}
      </UserMetaList>
    </Container>
  )
}

export { ProfileAsideSkeleton } from './skeleton'
