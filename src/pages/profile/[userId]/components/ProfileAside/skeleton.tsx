import React from 'react'
import { BookOpen, BookmarkSimple, Books, UserList } from 'phosphor-react'

import { Skeleton } from '~/components/Skeleton'
import { Heading, Text } from '~/components/texts'

import { Container, Header, MetaItem, UserMetaList } from './styles'

export const ProfileAsideSkeleton: React.FC = () => {
  const userMetas = {
    read_pages: {
      label: 'Páginas lidas',
      icon: <BookOpen weight={'bold'} size={32} />,
    },
    avaliated_books: {
      label: 'Livros Avaliados',
      icon: <Books weight={'bold'} size={32} />,
    },
    read_authors: {
      label: 'Autores lidos',
      icon: <UserList weight={'bold'} size={32} />,
    },
    category_most_read: {
      label: 'Categoria mais lida',
      icon: <BookmarkSimple weight={'bold'} size={32} />,
    },
  }
  return (
    <Container>
      <Header>
        <Skeleton css={{ height: 72, width: 72 }} roundedFull bg={'gray700'} />

        <Skeleton
          as={Heading}
          css={{ height: 28, width: '50%', marginBottom: '$1' }}
          bg={'gray700'}
        />

        <Skeleton as={Text} css={{ height: 22, width: '50%' }} bg={'gray700'} />
      </Header>

      <hr />

      <UserMetaList>
        {Object.entries(userMetas).map(([key, value]) => (
          <MetaItem key={key}>
            {value.icon}

            <div>
              <Skeleton
                as={Heading}
                css={{ height: 22, width: 110, marginBottom: '$1' }}
                bg={'gray700'}
              />

              <Text size="sm">{value.label}</Text>
            </div>
          </MetaItem>
        ))}
      </UserMetaList>
    </Container>
  )
}
