import React from 'react'

import { Container, Header, MetaItem, UserMetaList } from './styles'
import { ProfileImage } from '~/components/ProfileImage'
import { useDateFormatter } from '~/hooks/useDateFormater'
import { Heading, Text } from '~/components/texts'
import { BookOpen, BookmarkSimple, Books, UserList } from 'phosphor-react'

export const ProfileAside: React.FC = () => {
  const user = {
    name: 'Luiz Bueno',
    avatar_url: 'https://github.com/luiz504.png',
    created_at: new Date('2022-05-22'),
  }

  const { distanceFromNow } = useDateFormatter(user.created_at)

  const userMetas = {
    read_pages: {
      value: 853,
      label: 'Páginas lidas',
      icon: <BookOpen weight={'bold'} size={32} />,
    },
    avaliated_books: {
      value: 10,
      label: 'Livros Avaliados',
      icon: <Books weight={'bold'} size={32} />,
    },
    read_authors: {
      value: 3,
      label: 'Autores lidos',
      icon: <UserList weight={'bold'} size={32} />,
    },
    category_most_read: {
      value: 'Horror',
      label: 'Categoria mais lida',
      icon: <BookmarkSimple weight={'bold'} size={32} />,
    },
  }

  return (
    <Container>
      <Header>
        <ProfileImage src="" alt="" size={72} />

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
